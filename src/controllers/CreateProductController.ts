import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Product from '../models/Product';
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
            category_id: Number(category),
            images,
        };
        
        // Checks if the product data is valid
        await productValidation.validate(data);

        // Connects if 'Product' repository
        const getProductRepositoy = getRepository(Product);

        // Create the product schema
        const product = getProductRepositoy.create(data);

        // Save the product into the database
        await getProductRepositoy.save(product);

        return res.status(201).json(product);
    }
}