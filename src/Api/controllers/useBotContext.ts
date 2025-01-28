import { Request, Response, NextFunction } from "express";
import { Sharpy } from "../../Client";

/* eslint-disable */
declare global {
    namespace Express {
        interface Request {
            echo: Sharpy;
        }
    }
}
/* eslint-enable */

export const useBotContext = (echo: Sharpy) => {
    return (req: Request, res: Response, next: NextFunction) => {
        req.echo = echo;
        next();
    };
};
