import { Request, Response } from 'express';
import mongoose, { ClientSession } from 'mongoose';
import Product from '../models/Product';

import ImagesController, { MulterFile, ImageInterface } from './ImagesController';

const imagesController = new ImagesController();

const {
    saveImagesFiles,
    deleteImagesFiles
} = imagesController;

// Handles the delition process
const deleteImage = async (productId: string, session: ClientSession, toDelete: string) => {
    
    // Finds the Document that matches the id
    await Product.updateOne(
        { _id: productId },
        {
            $pull: {
                "images": {
                    "key": toDelete
                }
            }
        }
    )
    .session(session)
    .then(() => {

        //If the image was successfully deleted from the Document, delete it from the aws cloud
        deleteImagesFiles(toDelete) 
    })
    .catch(err => {
        console.log(err)
    });
}

export default {

    // Update the product matching the 'id'
    async updateProduct(req: Request, res: Response) {
        const { id: productId } = req.params;
        const { title, category, value, delete_image } = req.body;
        const files = req.files as MulterFile[];

        const typeDeleteImage = typeof delete_image;

        // Create a session and start a transaction
        const session = await mongoose.startSession();
        session.startTransaction();

        try {

            // Try to find the product matching the 'id'
            const product = await Product.findOne({
                _id: productId
            }).session(session);

            // If the product wasn't found, returns an error
            if (!product) throw Error;

            if (title) product.title = title; // Update title
            if (value) product.value = Number(value); // Update value
            if (category) product.category = category; // Update category

            // If the user sent images to be added
            if (files.length !== 0) {
                const images: ImageInterface[] = saveImagesFiles(files);

                images.map(image => {
                    product.images.push(image); // Add images into the Document
                })
            }

            // If the user wants to delete some images
            if (typeDeleteImage === 'string') {

                deleteImage(productId, session, delete_image) // Delete one image

            } else if (typeDeleteImage === 'object' && delete_image.length > 0) {

                delete_image.map(async (imageKey: string) => {
                    deleteImage(productId, session, imageKey) // Delete more than one image
                })
            }

            // If nothing failed, saves the changes
            await product.save();

            // Commit the transaction
            await session.commitTransaction();
            
            return res.status(200).json({ message: 'successfully' })

        } catch (err) {

            // If something failed, roll back all changes
            await session.abortTransaction();

            // Deletes images added to the aws bucket
            files.map(image => {
                if (image.key) deleteImagesFiles(image.key)
            });

            return res.status(500).json({ message: 'Something went wrong' })

        } finally {

            session.endSession();

        }
    }
}