import { Router } from 'express';
import multer from 'multer';

import cofig from './config/upload';
import GetProductsController from './controllers/GetProductsController';
import CreateProductController from './controllers/CreateProductController';
import CategoriesController from './controllers/CategoriesController';
import DeleteProductController from './controllers/DeleteProductController';

export const routes = Router();
const upload = multer(cofig);

// List all producst from database
routes.get('/', GetProductsController.listProducts);

// Gets a product matching the [id]
routes.get('/product/:id', GetProductsController.getProduct);

// Create a new product
routes.post('/create-product', upload.array('image'), CreateProductController.createProduct);

// Delete a product matching the [id]
routes.delete('/admin/delete-product/:id', DeleteProductController.deleteProduct);

// Handle categories
routes.get('/admin/create-categories', CategoriesController.showCategories);
routes.post('/admin/create-categories', CategoriesController.createCategories);
routes.delete('/admin/create-categories/:id', CategoriesController.deleteCategory);