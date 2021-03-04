import { ErrorRequestHandler } from 'express';
import { EntityNotFoundError, QueryFailedError } from 'typeorm';

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    // Used to handle delete category error
    if(err instanceof EntityNotFoundError) {
        return res.status(404).json({ message: err.message });
    } 
    
    // Used to handle show product error. Usually occurs when the [id] does not match
    else if(err instanceof QueryFailedError) {
        return res.status(400).json({ message: err.message })
    }

    return res.status(500).json({ error: "Internal server error!"});
}

export default errorHandler;