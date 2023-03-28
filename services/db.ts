import mongoose from "mongoose";
import { AppError } from "../components/errors";

export class DBConnection {
    url = "mongodb://127.0.0.1:27017/test";
    constructor() {}
    async connect() {
        try {
            await mongoose.connect(this.url);
            console.log("MongoDB is connected");
        } catch (error) {
            throw new AppError(
                "Mongo connection problem",
                0,
                JSON.stringify(error.errors),
                true
            );
        }
    }
}
