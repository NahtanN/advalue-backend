import { Router } from 'express';
import multer from 'multer';

import cofig from './config/upload';
import UploadController from './controllers/UploadController';

export const routes = Router();
const upload = multer(cofig);

routes.post('/upload', upload.array('image'), UploadController.createProduct);