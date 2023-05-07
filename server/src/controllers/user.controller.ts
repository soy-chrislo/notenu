import { Request, Response } from 'express';
import userModel from "../models/user.model";

async function getUsers(req: Request, res: Response){
  try {
    const result = await userModel.getUsers();
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Internal server error'
    });
  }
}

async function getUserById(req: Request, res: Response){
  try {
    const { id } = req.params;
    const result = await userModel.getUserById(id);
    res.json(result);
  } catch (err: any) {
    res.status(500).json({
      message: err?.message || 'Internal server error'
    });
  }
}

interface User {
  name: string;
  password: string;
}

async function createUser(req: Request, res: Response){
  try {
    const { name, password } = req.body;
    const user: User = { name, password };
    const result = await userModel.createUser(user);
    res.json(result);
  } catch (err: any) {
    res.status(500).json({
      message: err?.message || 'Internal server error'
    });
  }
}

async function updateUser(req: Request, res: Response){
  try {
    const { id } = req.params;
    const { name, password } = req.body;
    const user: User = { name, password };
    const result = await userModel.updateUserById(id, user);
    res.json(result);
  } catch (err: any) {
    res.status(500).json({
      message: err?.message || 'Internal server error'
    });
  }
}



export default {
  getUsers,
  getUserById,
  createUser,
  updateUser
}