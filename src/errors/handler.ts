import { ErrorRequestHandler } from 'express';
import { EntityNotFoundError, QueryFailedError } from 'typeorm';
import { ValidationError } from 'yup';
import ProductsNotFound from './ProductsNotFound';

interface ErrorsInterface {
    [key: string]: string[];
}

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    console.log(err)
    // Thrown when no result could be found in methods which are not allowed to return undefined or an empty set
    if(err instanceof EntityNotFoundError) {
        return res.status(404).json({ message: err.message });
    } 
    
    // Thrown when query execution has failed
    else if(err instanceof QueryFailedError) {
        return res.status(400).json({ message: err.message })
    }

    // Used to handle Yup validation errors
    else if(err instanceof ValidationError) {
        const errors: ErrorsInterface = {};
        
        // Gets what is missing and the error messages
        err.inner.forEach(err => {
            if(err.path) errors[err.path] = err.errors
        });

        return res.status(500).json({
            message: 'Validation fails',
            errors
        })
    }

    // Used when the list of products is empty
    else if(err instanceof ProductsNotFound) {
        return res.status(404).json({ Error: err.message });
    }
    console.log(err)
    return res.status(500).json({ error: "Internal server error!"});
}

export default errorHandler;