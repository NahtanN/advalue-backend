import { Request, Response } from 'express';
import Product from '../models/Product';
import { Document } from 'mongoose';
import CreateProductValidation from '../validation/CreateProductValidation';
import ImagesController, { MulterFile } from './ImagesController';

const imagesController = new ImagesController();
const productValidation = new CreateProductValidation();

export default {
    async createProduct(req: Request, res: Response) {
        const { title, category, value } = req.body;
        const files = req.files as MulterFile[];
        
        // Images schema
        const images = imagesController.saveImagesFiles(files);

        const data = {
            title,
            value: Number(value),
            category,
            images,
        };
        
        // Checks if the product data is valid
        await productValidation.validate(data);

        // Create product
        const product: Document = new Product(data);
        
        // Save product into the database
        await product.save();

        return res.status(201).json(product);
    }
}