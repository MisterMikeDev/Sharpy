import { Router } from "express";
import { AuthRouter } from "./Auth.routes";

const router = Router();

router.get("/", (req, res) => {
    res.json({
        message: "Hola mundo"
    });
});

router.use("/auth", AuthRouter);

export default router;
