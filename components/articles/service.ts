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
}
