/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";
import { LoginController } from "../controllers";

const { login, verifyToken } = LoginController;

const router = Router();

router.post("/", login);
router.get("/verify", verifyToken);

export default router;
