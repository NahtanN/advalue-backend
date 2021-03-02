import { Request, Response } from "express";

export default {
    async createProduct(req: Request, res: Response) {
        return res.status(201).json({ 
            body: req.body,
            file: req.files
        });
    }
}