import express from "express";
import dotenv from "dotenv";
import route from "./components/articles/api";
import mongoose from "mongoose";
import { DBConnection } from "./services/db";

dotenv.config();
export const app = express();
app.use(route);

app.listen(3001, () => {
    console.log("I am listening on 3001");
});
