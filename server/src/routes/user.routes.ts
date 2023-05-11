/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";

import userController from "../controllers/user.controller";

const router = Router();
const { getUsers, getUserById, createUser, updateUser } = userController;

router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/", createUser);
router.put("/:id", updateUser);

export default router;
