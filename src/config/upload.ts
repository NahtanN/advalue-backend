import { Request } from 'express';
import multer from 'multer';
import path from 'path';
import crypto from 'crypto'

const generateName = (originalName: string, hash: string) => {
    originalName = originalName.split(' ').join('_');
    return `${hash}-${originalName}`
}

const storageTypes = {
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
    s3: {

    }
}

export default {
    destination: path.join(__dirname, '..', '..', 'uploads'),
    storage: storageTypes['local'],
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