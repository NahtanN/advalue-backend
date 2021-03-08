import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Product from "../models/Product";

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
    
        //  Deleted him
        await productRepository.remove(product);

        return res.json({
            status: 'Deleted',
            product
        })
    }
}