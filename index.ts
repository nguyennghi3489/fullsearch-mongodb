import express from "express";
import dotenv from "dotenv";
import route from "./components/articles/api";
import {
    isOperationalError,
    logError,
    returnError,
} from "./components/errors/error-handlers";
import { Container } from "./services/container";

dotenv.config();
export const app = express();
app.use(express.json());
app.use(route);
app.use(logError);
app.use(returnError);

const container = new Container();
container.db.connect();

process.on("uncaughtException", (error) => {
    console.log("WE GO HERE RIGHT 123");
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
