import mongoose, { Model, Schema, Document } from "mongoose";

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
        title: { type: String, index: "text", required: true },
        author: { type: String, index: "text", required: true },
        body: { type: String, index: "text", required: true },
    },
    {
        statics: {
            searchFullText(keyword) {
                return this.find({ $text: { $search: `\\${keyword}\\` } });
            },
        },
    }
);

export const ArticleModel = mongoose.model<IArticle, IArticleModel>(
    "articles",
    ArticleSchema
);
