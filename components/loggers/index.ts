import { format, transports, createLogger } from "winston";
const { combine, timestamp, prettyPrint, printf } = format;

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
};

const myFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level}: ${message}`;
});
export const logger = createLogger({
    format: combine(timestamp(), myFormat),
    levels,
    transports: [
        new transports.Console(),
        new transports.File({ filename: "error.log", level: "error" }),
        new transports.File({ filename: "all.log" }),
    ],
});
