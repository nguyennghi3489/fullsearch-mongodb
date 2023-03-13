import mongoose from "mongoose";

export class DBConnection {
    url = "mongodb://127.0.0.1:27017/test";
    constructor() {}
    connect() {
        try {
            mongoose.connect(this.url);
            console.log("connect to mongo");
        } catch (error) {
            console.log(error);
        }
    }
}
