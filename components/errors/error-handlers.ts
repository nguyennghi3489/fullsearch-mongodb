import { NextFunction, Request, Response } from "express";
import { AppError } from ".";

export function logError(err) {
    console.error(err);
}

export function logErrorMiddleware(
    err: AppError,
    req: Request,
    res: Response,
    next: NextFunction
) {
    logError(err);
    next(err);
}

export function returnError(
    err: AppError,
    req: Request,
    res: Response,
    next: NextFunction
) {
    res.status(err.statusCode || 500).send(err.message);
}

export function isOperationalError(error) {
    if (error instanceof AppError) {
        return error.isOperational;
    }
    return false;
}
