import { Request } from 'express';
import multer from 'multer';
import path from 'path';
import crypto from 'crypto';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';

const generateName = (originalName: string, hash: string) => {
    originalName = originalName.split(' ').join('_');
    return `${hash}-${originalName}`
}

const storageTypes = {

    // Local storage config
    local: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.join(__dirname, '..', '..', 'uploads'))
        },
        filename: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                if(err) cb(err, 'Error')

                const fileName = generateName(file.originalname, hash.toString('hex'));

                cb(null, fileName);
            });
        }
    }),
    // Amazon S3 storage config
    s3: multerS3({
        s3: new aws.S3(),
        bucket: process.env.AWS_BUCKET_NAME,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: 'public-read',
        key: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                if(err) cb(err, 'Error')

                const fileName = generateName(file.originalname, hash.toString('hex'));

                cb(null, fileName);
            });
        }
    })
}

export default {
    destination: path.join(__dirname, '..', '..', 'uploads'),

    // Where to storage. If it's in production, store in Amazon S3 cloud
    storage: 
        process.env.PORT
            ? storageTypes.s3
            : storageTypes.local,
    limits: {
        fileSize: 2 * 1024 * 1024,
    },
    fileFilter: (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
        const allowedMines = [
            'image/jpeg',
            'image/pjpeg',
            'image/png',
        ];

        if(allowedMines.includes(file.mimetype)) {
            
            cb(null, true);
        } else {
            cb(new Error('Invalid file type.'))
        }
    }
}