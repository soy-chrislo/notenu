import { Router } from "express";
import { LoginController } from "../controllers";

const router = Router()

router.get('/', LoginController.login)

export default router