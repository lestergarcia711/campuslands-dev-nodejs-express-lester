import { Router } from "express";
import authRouter from "./auth.routes.js";
import toursRouter from "./tours.routes.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/tours", toursRouter);

export default router;