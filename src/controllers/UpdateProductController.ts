import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Category from "../models/Category";
import Product from "../models/Product";
import CategoriesController from './CategoriesController';
import ImagesController, { MulterFile } from './ImagesController';

const imagesController = new ImagesController();

export default {
    async updateProduct(req: Request, res: Response) {
        const { id: productId } = req.params;
        const { title, category_id, value, delete_image } = req.body;
        const files = req.files as MulterFile[];

        // Connect with the Product repository
        const getProductRepository = getRepository(Product);
        
        // Try to find a product matching the [productId]
        // If it fails, return a error of type QueryFailedError
        let product = await getProductRepository.findOneOrFail(productId);
        
        // Update filds
        product.title = title;        
        product.value = value;

        // Updates category entity if true
        if(category_id) {

            // Finds the category entity        
            let category = await CategoriesController.findCategory(Number(category_id));
            product.category = category;
        }

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
    },

    async removeCategoryEntity(id: number) {
        const getProductRepository = getRepository(Product);
        const categoriesRepository = getRepository(Category);

        // Finds all the products how has the entity [id]
        const products = await getProductRepository.find({
            where: {
                category_id: id
            }
        });

        // Gets the placeholder entity
        const PlaceHolderCategory = await categoriesRepository.findOneOrFail({
            where: {
                name: 'Update our category'
            }
        });        

        // Update the products with the placeholder
        products.map(async product => {
            product.category = PlaceHolderCategory;
        });

        // Save changes
        return await getProductRepository.save(products);
    }
}