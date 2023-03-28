import { NextFunction, Request, Response } from "express";
import { loggers } from "winston";
import { AppError } from ".";
import { logger } from "../loggers";

export function logError(err: AppError) {
    logger.info(err);
}

export function returnError(
    err: AppError,
    req: Request,
    res: Response,
    next: NextFunction
) {
    logger.error(err);
    res.status(err.statusCode || 500).send(err.message);
}

export function isOperationalError(error) {
    if (error instanceof AppError) {
        return error.isOperational;
    }
    return false;
}

export const streamError = {
    // Use the http severity
    write: (message) => {
        logger.http(message);
    },
};
