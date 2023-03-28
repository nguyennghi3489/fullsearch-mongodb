import express, { Request } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import route from "./components/articles/api";
import {
    isOperationalError,
    logError,
    returnError,
} from "./components/errors/error-handlers";
import { Container } from "./services/container";
import { IncomingMessage } from "http";
import { assignId } from "./utils";

dotenv.config();
export const app = express();
app.use(assignId);
app.use(morgan(":id :method :url :response-time"));
app.use(express.json());
app.use(route);
app.use(logError);
app.use(returnError);

morgan.token("id", (req: IncomingMessage & Request) => {
    console.log(req.id);
    return req.id;
});

const container = new Container();
container.db.connect();

process.on("uncaughtException", (error) => {
    logError(error);

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
