import { Request, Response } from "express";
import Product, { ProductInterface } from "../models/Product";
import ImagesController, { ImageInterface } from './ImagesController';

const imagesController = new ImagesController();

export default {

    // Delete a product matching the [id]
    async deleteProduct(req: Request, res: Response) {
        const { id } = req.params;

        // Find the product
        const product = await Product.findOne({
            _id: id
        });

        if (!product) return res.json('Product not found')
        
        // Deletes all images associated with the product
        product.images.map((image: ImageInterface) => {
            imagesController.deleteImagesFiles(image.key);
        });

        //  Deleted the product
        await Product.deleteOne({
            _id: id
        });

        return res.json({
            status: 'Deleted',
            product
        })
    }
}