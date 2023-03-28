import { DAL, IDAL } from "../components/articles/dal";
import { Service } from "../components/articles/service";
import { DBConnection } from "./db";

export class Container {
    db: DBConnection;
    constructor() {
        this.db = new DBConnection();
        return this;
    }

    getService() {
        const userDal: IDAL = new DAL();
        return new Service(userDal);
    }
}
