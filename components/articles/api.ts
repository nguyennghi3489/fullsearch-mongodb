import { Router, Request, Response, NextFunction } from "express";
import { Container } from "../../services/container";

const route = Router();
const container = new Container();

route.get(
    "/articles",
    async (req: Request, res: Response, next: NextFunction) => {
        const {
            query: { keyword },
        } = req;

        const context = {
            action: "SEARCH",
            data: keyword,
        };

        try {
            const result = await container.getService().excute(context);
            res.send(JSON.stringify(result));
        } catch (e) {
            next(e);
        }
    }
);

route.post(
    "/articles",
    async (req: Request, res: Response, next: NextFunction) => {
        const data = req.body;

        const context = {
            action: "CREATE",
            data,
        };

        try {
            const result = await container.getService().excute(context);
            res.send(JSON.stringify(result));
        } catch (e) {
            next(e);
        }
    }
);

route.put(
    "/articles",
    async (req: Request, res: Response, next: NextFunction) => {
        const data = req.body;

        const context = {
            action: "EDIT",
            data,
        };

        try {
            const result = await container.getService().excute(context);
            res.send(JSON.stringify(result));
        } catch (e) {
            next(e);
        }
    }
);

export default route;
