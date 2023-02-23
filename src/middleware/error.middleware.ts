import { NextFunction, Request, Response } from 'express';
import ErrorHandler from '../config/customErrorHandler';

export default function errorMiddleware(err: ErrorHandler, req: Request, res: Response, next: NextFunction): Response {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error"
    return res.status(err.statusCode).json({
        success: false,
        error: err.message
    })
}