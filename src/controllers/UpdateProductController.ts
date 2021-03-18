import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Product from "../models/Product";

import ImagesController, { MulterFile } from './ImagesController';
import Image from "../models/Image";

const imagesController = new ImagesController();

export default {
    async updateProduct(req: Request, res: Response) {
        const { id: productId } = req.params;
        const { title, category, value, delete_image } = req.body;
        const files = req.files as MulterFile[];

        // Connect with the Product repository
        const getProductRepository = getRepository(Product);        
        
        // Try to find a product matching the [productId]
        // If it fails, return a error of type QueryFailedError
        let product = await getProductRepository.findOneOrFail(productId);
        
        // Update filds
        product.title = title;
        product.category_id = 10;
        // product.category. = Number(category)
        product.value = value;
        // product.images.

        // If user wants to add some images
        if(files) {

            // Gets formatted images
            const imagesFiles = imagesController.saveImagesFiles(files);
    
            // Insert product_id into images files
            const imagesProductId = imagesFiles.map(image => {
                return {
                    ...image,
                    product_id: productId
                }
            });
            
            // Save new images references into the database
            imagesController.addImagesIntoDatabase(imagesProductId)
        }

        // If user wants to delete some images
        if(delete_image) {
            typeof delete_image === 'string' 
                ? imagesController.deleteImageFromDatabase(delete_image, productId)  // Deletes 1 image
                : imagesController.deleteManyImagesFromDatabase(delete_image, productId); // Deletes an array of images
        }

        // Save the changes
        await getProductRepository.save(product);
        
        return res.status(200).json({ message: 'successfully' });
    }
}