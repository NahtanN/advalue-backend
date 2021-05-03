import { Request, Response } from "express";
import Category from "../models/Category";
import { Document } from 'mongoose';
import UpdateProductController from "./UpdateProductController";
import chalk from "chalk";

export default {
    // Return all categories from database
    async showCategories(req: Request, res: Response) {
        Category
            .find()
            .select('-_id -__v')    // Exclude the "_id" and "__v"
            .then((categories: object) => {                
                return res.status(200).json(categories);
            });
    },
    
    async createCategories(req: Request, res: Response) {
        // Get an array with the category or categories name
        const { names } = req.body;
        
        // Insert the category names into the collection
        names.map((name: string) => {
            const category: Document = new Category({ name });

            category.save((err) => {
                const code = 'E11000';  // Duplicate key error

                if (err && !err?.message.includes(code)) console.log(err.name, chalk.red(err.message))
            });
        });

        return res.status(201).json({ status: "Created"});
    },

    async deleteCategory(req: Request, res: Response) {
        const { names } = req.body;

        // Removes the category entity from products
        // await UpdateProductController.removeCategoryEntity(Number(id))

        // if it was found, remove from the database and return a OK(200) status
        names.map((name: string) => {
            Category.deleteOne({ name }, (err) => {
                if (err) console.log(err)
            });
        })
        
        return res.status(200).json();
    }
}