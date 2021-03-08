import aws from 'aws-sdk';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const s3 = new aws.S3();

export default class ImagesController {
    async deleteProductImages(Key: string) {

        // Deletes images from AWS S3 cloud
        if(process.env.NODE_ENV) {
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