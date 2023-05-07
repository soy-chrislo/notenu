import { Router } from "express";

const router = Router();

import userController from "../controllers/user.controller";
const { getUsers, getUserById, createUser, updateUser } = userController;

router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);

export default router;