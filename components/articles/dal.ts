import { Error } from "mongoose";
import { ArticleModel, IArticle } from "./model";

export interface IDAL {
    searchByKeyword(keyword: string): Promise<IArticle[]>;
    createArticle(article: IArticle): void;
    editArticle(article: IArticle): void;
}

export class DAL implements IDAL {
    constructor() {}

    async searchByKeyword(keyword: string): Promise<IArticle[]> {
        return await ArticleModel.searchFullText(keyword);
    }

    async createArticle(article: IArticle) {
        const newArticle = new ArticleModel(article);
        const error = newArticle.validateSync();
        if (error) {
            console.log(error.errors);
            return null;
        }
        return await ArticleModel.create(article);
    }

    async editArticle(article: IArticle) {
        console.log(article);
        try {
            const editingArticle = await ArticleModel.findOneAndUpdate(
                { id: article.id },
                { body: article.body },
                { runValidators: true }
            );
            return editingArticle;
        } catch (e) {
            console.log(e);
            console.log(e.errors.body.message);
            return null;
        }
    }
}
