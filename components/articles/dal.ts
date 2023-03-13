import { ArticleModel, IArticle } from "./model";

export interface IDAL {
    searchByKeyword(keyword: string): Promise<IArticle[]>;
    createArticle(article: IArticle): void;
}

export class DAL implements IDAL {
    constructor() {}

    async searchByKeyword(keyword: string): Promise<IArticle[]> {
        return await ArticleModel.searchFullText(keyword);
    }

    async createArticle(article: IArticle) {
        return await ArticleModel.create(article);
    }
}
