import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Product from "../models/Product";
import ProductsNotFound from '../errors/ProductsNotFound';

export default {
    // Gets all products from database
    async listProducts(req: Request, res: Response) {
        const { pg } = req.query;
        const page = Number(pg) || 1;

        // Sets the skip value for pagination
        var skip_value = 0;

        if(pg) skip_value = (page - 1) * 10;

        // Access the products repository
        const productRepository = getRepository(Product);

        // Gets the products and create pagination
        const products = await productRepository.findAndCount({
            order: {
                created_at: "DESC"
            },
            skip: skip_value,
            take: 10
        });
        
        if(products[0].length === 0) throw new ProductsNotFound('Page not found!')

        return res.status(200).json({
            current_page: page,
            prev_page: skip_value > 0 ? (page - 1) : null,
            next_page: products[1] > page * 10 ? (page + 1) : null,
            data: products[0]
        });
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