import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Product from "../models/Product";

export default {
    // Gets all products from database
    async listProducts(req: Request, res: Response) {
        const productRepository = getRepository(Product);

        const products = await productRepository.find({
            order: {
                createdAt: "DESC"
            }
        });

        return res.status(200).json(products);
    },

    // Gets a product matching the [id]
    async getProduct(req: Request, res: Response) {
        const { id } = req.params;

        const productRepository = getRepository(Product);
        
        const product = await productRepository.findOneOrFail({
            where: {
                id
            }
        });

        return res.status(200).json(product);
    }
}