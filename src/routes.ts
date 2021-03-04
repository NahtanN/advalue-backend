import { Router } from 'express';
import multer from 'multer';

import cofig from './config/upload';
import UploadController from './controllers/UploadController';
import CategoriesController from './controllers/CategoriesController';

export const routes = Router();
const upload = multer(cofig);

routes.post('/upload', upload.array('image'), UploadController.createProduct);

routes.get('/admin/create-categories', CategoriesController.showCategories);
routes.post('/admin/create-categories', CategoriesController.createCategories);
routes.delete('/admin/create-categories/:id', CategoriesController.deleteCategory);