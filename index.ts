import express, { Request } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import { IncomingMessage } from "http";
import * as Sentry from "@sentry/node";
import route from "./components/articles/api";
import {
    isOperationalError,
    logError,
    returnError,
    streamError,
} from "./components/errors/error-handlers";
import { Container } from "./services/container";
import { assignId } from "./utils";
import { logger } from "./components/loggers";

dotenv.config();
export const app = express();
Sentry.init({
    dsn: "https://b3be384f51b74b18891051d4f439de66@o4504913902960640.ingest.sentry.io/4504921637322752",
    tracesSampleRate: 1.0,
});

app.use(assignId);
app.use(morgan(":id :method :url :response-time", { stream: streamError }));
app.use(express.json());
app.use(route);
app.use(logError);
app.use(returnError);

morgan.token("id", (req: IncomingMessage & Request) => {
    return req.id;
});

const container = new Container();
container.db.connect();

process.on("uncaughtException", (error) => {
    logger.error(error);

    if (!isOperationalError(error)) {
        process.exit(1);
    }
});

process.on("unhandledRejection", (error) => {
    throw error;
});

app.listen(3001, () => {
    console.log("I am listening on 3001");
});
