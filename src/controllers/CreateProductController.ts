import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import ImagesHelper from '../Helper/ImagesHelper';
import Product from '../models/Product';
import CreateProductValidation from '../validation/CreateProductValidation';

const imagesHelper = new ImagesHelper();
const productValidation = new CreateProductValidation();

interface MulterFile {
    originalname: string;
    filename: string;
    size: number;
    key?: string;
    location?: string;
}

export default {
    async createProduct(req: Request, res: Response) {
        const { title, category, value } = req.body;
        const files = req.files as MulterFile[];
        
        // Images schema
        const images = files.map(file => {
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
                url: location || imagesHelper.getLocalUrl(filename)
            }
        });

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