import { Router, Request, Response } from "express";
import { Container } from "../../services/container";

const route = Router();
const container = new Container();

route.get("/articles", async (req: Request, res: Response) => {
    const {
        query: { keyword },
    } = req;

    const context = {
        action: "SEARCH",
        data: keyword,
    };

    const result = await container.getService().excute(context);

    res.send(JSON.stringify(result));
});

route.post("/articles", async (req: Request, res: Response) => {
    const data = req.body;

    const context = {
        action: "CREATE",
        data,
    };

    const result = await container.getService().excute(context);
    res.send(JSON.stringify(result));
});

route.put("/articles", async (req: Request, res: Response) => {
    const data = req.body;

    const context = {
        action: "EDIT",
        data,
    };

    const result = await container.getService().excute(context);
    res.send(JSON.stringify(result));
});

export default route;
