import aws from 'aws-sdk';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

import ImagesHelper from '../helper/ImagesHelper';

import { getRepository } from "typeorm";
import Image from "../models/Image";

export interface MulterFile {
    originalname?: string;
    filename?: string;
    size: number;
    key?: string;
    location?: string;
    product_id?: string;
}

const s3 = new aws.S3();
const imagesHelper = new ImagesHelper();

export default class ImagesController {
    
    // Deletes the physical file
    async deleteImagesFiles(Key: string) {

        // Deletes images from AWS S3 cloud
        if(process.env.PORT) {
            return s3.deleteObject({
                Bucket: process.env.AWS_BUCKET_NAME,
                Key,
            }).promise();
        }

        // Deletes from local storage
        else {
            return promisify(fs.unlink)(
                path.resolve(__dirname, '..', '..', 'uploads', Key)
            );
        }
    }

    saveImagesFiles(files: MulterFile[]) {
        return files.map(file => {
            const {
                originalname,
                filename,
                size,
                key,
                location
            } = file;

            return {
                name: originalname,
                size,
                key: key || filename,
                url: location || imagesHelper.getLocalUrl(filename ? filename : ''),
            }
        });
    }

    async addImagesIntoDatabase(imagesFiles: MulterFile[]) {
        const getImagesRepository = getRepository(Image);

        const images = getImagesRepository.create(imagesFiles);

        await getImagesRepository.save(images);
    }

    // Deletes a image from the database
    async deleteImageFromDatabase(imageKey: string, productId: string) {
        
        // Connect with the Image repository
        const getImagesRepository = getRepository(Image);

        // Try to find a image matching the [key] and [product_id]
        // If they don't match, remove won't be possible
        return await getImagesRepository.findOneOrFail({ key: imageKey, product_id: productId })
            .then(async image => {                
                await getImagesRepository.remove(image);
                this.deleteImagesFiles(imageKey);
            });
    }

    // Deletes many images from database
    deleteManyImagesFromDatabase(imagesKey: Array<string>, productId: string) {
        imagesKey.map(imageKey => {
            this.deleteImageFromDatabase(imageKey, productId);
        });
    }
}