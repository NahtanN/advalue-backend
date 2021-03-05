import { ErrorRequestHandler } from 'express';
import { EntityNotFoundError, QueryFailedError } from 'typeorm';
import { ValidationError } from 'yup';

interface ErrorsInterface {
    [key: string]: string[];
}

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    // Used to handle delete category error
    if(err instanceof EntityNotFoundError) {
        return res.status(404).json({ message: err.message });
    } 
    
    // Used to handle show product error. Usually occurs when the [id] does not match
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

    return res.status(500).json({ error: "Internal server error!"});
}

export default errorHandler;