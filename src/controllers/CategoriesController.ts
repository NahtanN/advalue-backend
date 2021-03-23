import { Request, Response } from "express";
import { getConnection, getRepository } from "typeorm";
import Category from "../models/Category";
import UpdateProductController from "./UpdateProductController";

export default {
    // Return all categories from database
    async showCategories(req: Request, res: Response) {
        const categoriesRepository = getRepository(Category);

        const categories = await categoriesRepository.find();

        return res.status(200).json(categories);
    },
    
    async createCategories(req: Request, res: Response) {
        // Get an array with the category or categories name
        const { names } = req.body;
        
        // Insert the category names into the categories table
        names.map(async (name: string) => {
            await getConnection()
                    .createQueryBuilder()
                    .insert()
                    .into(Category)
                    .values({ name })
                    .onConflict("(name) DO NOTHING")
                    .execute()
        });

        return res.status(201).json({ status: "Created"});
    },

    async deleteCategory(req: Request, res: Response) {
        const { id } = req.params;

        const categoriesRepository = getRepository(Category);

        // if a category matching the [id] was not found, return a new error
        const category = await categoriesRepository.findOneOrFail(id);

        // Removes the category entity from products
        await UpdateProductController.removeCategoryEntity(Number(id))

        // if it was found, remove from the database and return a OK(200) status
        await categoriesRepository.remove(category);

        return res.status(200).json(category);
    },

    async findCategory(id: number) {
        const getCategoryRepository = getRepository(Category);

        return await getCategoryRepository.findOneOrFail({ id });
    }
}