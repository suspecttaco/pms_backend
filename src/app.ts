import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import { Routes } from "./routes";

export const app: Express = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/ping', (req: Request, res: Response) => {
    res.send('pong');
});

new Routes(app);
