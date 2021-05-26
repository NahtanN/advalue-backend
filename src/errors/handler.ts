import { ErrorRequestHandler } from 'express';
import mongoose from 'mongoose';
import { MongoError } from 'mongodb';
import { ValidationError } from 'yup';
import ProductsNotFound from './ProductsNotFound';

const { Error } = mongoose;

interface ErrorsInterface {
    [key: string]: string[];
}

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {

    if (err instanceof MongoError) {
        return res.status(500).json({
            status: 'Mongodb Error',
            err
        })
    }

    // Handle Yup validation errors
    else if (err instanceof ValidationError) {
        const errors: ErrorsInterface = {};
        
        // Gets what is missing and the error messages
        err.inner.forEach(err => {
            if(err.path) errors[err.path] = err.errors
        });

        return res.status(500).json({
            status: 'Validation fails',
            errors
        })
    }

    // Triggered when the list of products is empty
    else if (err instanceof ProductsNotFound || err instanceof Error.CastError) {
        return res.json({ Error: err.message });
    }
    console.log(err)
    return res.status(500).json({ error: "Internal server error!" });
}

export default errorHandler;