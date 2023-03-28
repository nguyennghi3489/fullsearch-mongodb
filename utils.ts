import uuid from "node-uuid";
import { NextFunction, Request, Response } from "express";

export function assignId(req: Request, res: Response, next: NextFunction) {
    req.id = uuid.v4();
    next();
}
