import mongoose, { Model, Schema, Document } from "mongoose";

export interface IContext {
    action: string;
    data: any;
}

export interface IArticle extends Document {
    title: string;
    author: string;
    body: string;
}

interface IArticleModel extends Model<IArticle> {
    searchFullText: (keyword: string) => IArticle[];
}

export const ArticleSchema = new Schema(
    {
        title: {
            type: String,
            index: "text",
            required: [true, "Missing Title Field"],
        },
        author: {
            type: String,
            index: "text",
            required: [true, "Missing Author Field"],
        },
        body: {
            type: String,
            index: "text",
            required: [true, "Missing Body Field"],
        },
    },
    {
        statics: {
            searchFullText(keyword) {
                try {
                    return this.find({ $text: { $search: `\\${keyword}\\` } });
                } catch (e) {
                    throw e;
                }
            },
        },
    }
);

export const ArticleModel = mongoose.model<IArticle, IArticleModel>(
    "articles",
    ArticleSchema
);
