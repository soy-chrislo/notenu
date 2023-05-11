import { type Request, type Response } from "express";
import userModel from "../models/user.model";

async function getUsers(req: Request, res: Response): Promise<void> {
  try {
    const result = await userModel.getUsers();
    res.json(result);
  } catch (err) {
    const error = err as Error;
    res.status(500).json({
      message: error.message,
    });
  }
}

async function getUserById(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const result = await userModel.getUserById(id);
    res.json(result);
  } catch (err: any) {
    const error = err as Error;
    res.status(500).json({
      message: error.message,
    });
  }
}

interface User {
  name: string;
  password: string;
}

async function createUser(req: Request, res: Response): Promise<void> {
  try {
    const { name, password } = req.body;
    const user: User = { name, password };
    const result = await userModel.createUser(user);
    res.json(result);
  } catch (err: any) {
    const error = err as Error;
    res.status(500).json({
      message: error.message,
    });
  }
}

async function updateUser(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const { name, password } = req.body;
    const user: User = { name, password };
    const result = await userModel.updateUserById(id, user);
    res.json(result);
  } catch (err: any) {
    const error = err as Error;
    res.status(500).json({
      message: error.message,
    });
  }
}

export default {
  getUsers,
  getUserById,
  createUser,
  updateUser,
};
