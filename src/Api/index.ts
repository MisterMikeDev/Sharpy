import express, { Application, json } from "express";
import cors from "cors";
import passport from "passport";
import expressSession from "express-session";
import { Sharpy } from "../Client";
import { ColorText } from "../Helpers";
import MainRouter from "./routes/Main.routes";
import { useBotContext } from "./controllers/useBotContext";
import "./controllers/DiscordAuth";

export class Api {
    public echo: Sharpy;
    public app: Application;
    public port: number;
    constructor(echo: Sharpy, port: string | number) {
        this.echo = echo;
        this.port = Number(port) || 3000;
        this.app = express();
        this.app.use(json());
        this.app.use(
            expressSession({
                secret: "asdasdasd",
                resave: false,
                saveUninitialized: false,
                cookie: {
                    secure: false,
                    httpOnly: false
                }
            })
        );
        this.app.use(passport.initialize());
        this.app.use(passport.session());
        this.app.use(cors({ origin: "*" }));
        this.routes();
    }
    public routes() {
        const context = useBotContext(this.echo);
        this.app.use("/", context, MainRouter);
    }
    public listen() {
        this.app.listen(this.port, () => {
            console.log(
                `[${ColorText("+", "greenBright")}] ${ColorText(
                    "Api",
                    "yellowBright"
                )} en ${ColorText(`http://localhost:${this.port}`, "blueBright")} ✅`
            );
        });
    }
}
