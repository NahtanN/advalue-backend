import { Request, Response } from "express";
import Product from "../models/Product";
import ProductsNotFound from '../errors/ProductsNotFound';

export default {

	// Gets all products from database
	async listProducts(req: Request, res: Response) {
		const { pg } = req.query;
		const page = Number(pg) || 1;
		const limitForPagination = 10;
		
		// Sets the skip value for pagination
		var skip_value = 0;

		if (pg) skip_value = (page - 1) * 10;

		// Gets the products and create pagination		
		const products = 
			await Product
				.find()
				.limit(limitForPagination)
				.skip(skip_value)
				.sort(
					{
						createdAt: 'desc',
					}
				)
				.select('-__v -createdAt -updatedAt');

		// Count the total of products in the database
		const totalProducts = 
			await Product
				.find()
				.countDocuments();

		if (products.length === 0) throw new ProductsNotFound('Page not found!');

		return res.status(200).json({
		    current_page: page,
		    prev_page: skip_value > 0 ? (page - 1) : null,
		    next_page: totalProducts > page * 10 ? (page + 1) : null,
		    quantity: products.length,
		    data: products
		});
	},

	// Gets a product matching the [id]
	async getProduct(req: Request, res: Response) {
	    const { id } = req.params;

		const product = await Product.find({
			_id: id
		});

	    return res.status(200).json(product);
	}
}