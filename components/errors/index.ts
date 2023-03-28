export class AppError extends Error {
    public readonly name: string;
    public readonly statusCode: number;
    public readonly isOperational: boolean;

    constructor(
        name: string,
        statusCode: number,
        description: string,
        isOperational: boolean
    ) {
        super(description);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = name;
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        Error.captureStackTrace(this);
    }
}
