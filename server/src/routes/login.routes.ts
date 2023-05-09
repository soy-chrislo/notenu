import { Router } from "express";
import { LoginController } from "../controllers";

const router = Router()

router.post('/', LoginController.login)

export default router