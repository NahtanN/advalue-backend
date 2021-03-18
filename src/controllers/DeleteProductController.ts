import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Product from "../models/Product";
import ImagesController from './ImagesController';

const imagesController = new ImagesController();

export default {

    // Delete a product matching the [id]
    async deleteProduct(req: Request, res: Response) {
        const { id } = req.params;
        
        const productRepository = getRepository(Product);

        // Find the product
        const product = await productRepository.findOneOrFail({
            where: {
                id
            }
        })
        
        // Deletes all images associated with the product
        product.images.map(image => {
            imagesController.deleteImagesFiles(image.key);
        });

        //  Deleted him
        await productRepository.remove(product);

        return res.json({
            status: 'Deleted',
            product
        })
    }
}