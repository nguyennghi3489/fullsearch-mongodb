import { DAL, IDAL } from "./dal";
import { IArticle } from "./model";

export class Service {
    articlesDAL: IDAL;
    constructor(articlesDAL: IDAL) {
        this.articlesDAL = articlesDAL;
    }

    async searchByKeyword(keyword: string) {
        return await this.articlesDAL.searchByKeyword(keyword);
    }

    async createArticle(article: IArticle) {
        return await this.articlesDAL.createArticle(article);
    }

    async editArticle(article: IArticle) {
        return await this.articlesDAL.editArticle(article);
    }

    async excute(context) {
        try {
            switch (context.action) {
                case "SEARCH":
                    return await this.searchByKeyword(context.data);
                case "CREATE":
                    return await this.createArticle(context.data);
                case "EDIT":
                    return await this.editArticle(context.data);
                default:
                    return null;
            }
        } catch (e) {}
    }
}
