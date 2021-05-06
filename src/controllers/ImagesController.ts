import aws from 'aws-sdk';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import Product from '../models/Product';

import ImagesHelper from '../helper/ImagesHelper';

export interface MulterFile {
    originalname?: string;
    filename?: string;
    size: number;
    key?: string;
    location?: string;
    product_id?: string;
}

export interface ImageInterface {
    name: string;
    size: number;
    key: string;
    url: string;
}

const s3 = new aws.S3();
const imagesHelper = new ImagesHelper();

export default class ImagesController {
    
    // Saves the physical files
    saveImagesFiles(files: MulterFile[]) : Array<ImageInterface> {
        return files.map(file => {
            const {
                originalname,
                filename,
                size,
                key,
                location
            } = file;

            return {
                name: String(originalname),
                size,
                key: String(key || filename),
                url: location || imagesHelper.getLocalUrl(filename ? filename : ''),
            }
        });
    }
    
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
}