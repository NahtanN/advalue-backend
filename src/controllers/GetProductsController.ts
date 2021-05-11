import { Request, Response } from "express";
import Product from "../models/Product";
import ProductsNotFound from '../errors/ProductsNotFound';

/**
 * Returns the result of a query in the database
 * 
 * @param page - required value for pagination
 * @param category - optional. Default value iquals 'index'
 * @param value - optional value for query based on the product value
 * @returns the total of products queried, how many products was skipped and the products
 */
const queryDatabase = async (page: number, category: string = 'index', value?: string | null) => {

	// Sets the skip value for pagination
	var skip_value = (page - 1) * 10;
	
	const limitForPagination = 10;
	
	// Query through database
	const products = 
		await Product
			.find(
				category != 'index' ? { category } : {}
			)
			.limit(limitForPagination)
			.skip(skip_value)
			.sort(
				value != null ? { value } : { createdAt: 'desc' }
			)
			.select('-__v -createdAt -updatedAt');	

	// Validation
	if (products.length === 0) throw new ProductsNotFound('Page not found!');

	// Count the total of products in the database
	const totalProducts = 
		await Product
			.find(
				category != 'index' ? { category } : {}
			)
			.countDocuments();	
	
	return {
		totalProducts,
		skip_value,
		products
	};
}

export default {

	// Gets all products from database
	async listProducts(req: Request, res: Response) {
		const { pg } = req.query;
		const page = Number(pg) || 1;

		// Gets the products and create pagination		
		const {
			totalProducts,
			skip_value,
			products
		} = await queryDatabase(page);		

		return res.status(200).json({
		    current_page: page,
		    prev_page: skip_value > 0 ? (page - 1) : null,
		    next_page: totalProducts > page * 10 ? (page + 1) : null,
		    quantity: products.length,
		    data: products
		});
	},

	async queryProducts(req: Request, res: Response) {
		const { pg, ctg, fil: filter } = req.query;
		const page = Number(pg) || 1;
		const category = String(ctg);		

		// Sets the filter param
		var value: string | null;

		switch(filter) {
			case 'Low+price': {
				value = 'ASC';
				break;
			}
			case 'High+price': {
				value = 'DESC';
				break;
			}
			default: {
				value = null;
				break;
			}
		}

		// Gets the products and create pagination		
		const {
			totalProducts,
			skip_value,
			products
		} = await queryDatabase(page, category, value);

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