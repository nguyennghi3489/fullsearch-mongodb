import { Router, Request, Response } from "express";
import { Container } from "../../services/container";
import { DAL, IDAL } from "./dal";
import { Service } from "./service";

const route = Router();
const container = new Container();

route.get("/", async (req: Request, res: Response) => {
    const {
        query: { keyword },
    } = req;

    const result = await container
        .getService()
        .searchByKeyword(keyword as string);

    res.send(JSON.stringify(result));
});

export default route;
