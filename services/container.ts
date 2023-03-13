import { DAL, IDAL } from "../components/articles/dal";
import { Service } from "../components/articles/service";
import { DBConnection } from "./db";

export class Container {
    constructor() {
        let db = new DBConnection();
        db.connect();
    }

    getService() {
        const userDal: IDAL = new DAL();
        return new Service(userDal);
    }
}
