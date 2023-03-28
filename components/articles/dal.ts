import { AppError } from "../errors";
import { ArticleModel, IArticle } from "./model";

export interface IDAL {
    searchByKeyword(keyword: string): Promise<IArticle[]>;
    createArticle(article: IArticle): void;
    editArticle(article: IArticle): void;
}

export class DAL implements IDAL {
    async searchByKeyword(keyword: string): Promise<IArticle[]> {
        try {
            return await ArticleModel.searchFullText(keyword);
        } catch (e) {
            console.log("Must here");
            throw e;
        }
    }

    async createArticle(article: IArticle) {
        const newArticle = new ArticleModel(article);
        const error = newArticle.validateSync();
        if (error) {
            throw new AppError(
                "Invalid Input",
                404,
                JSON.stringify(error.errors),
                true
            );
        }
        return await ArticleModel.create(article);
    }

    async editArticle(article: IArticle) {
        try {
            const editingArticle = await ArticleModel.findOneAndUpdate(
                { id: article.id },
                { body: article.body },
                { runValidators: true }
            );
            return editingArticle;
        } catch (error) {
            throw new AppError(
                "Invalid Input",
                404,
                JSON.stringify(error.errors),
                true
            );
        }
    }
}
