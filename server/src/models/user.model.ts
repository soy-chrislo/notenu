import { type OkPacket } from "mysql2";
import pool from "../config/dbPool";

interface User {
  id?: string;
  name: string;
  password: string;
}

interface QueryResult extends RowData {
  message: string;
  data?: any;
}

type RowData = Record<string, any>;

async function createUser(user: User): Promise<QueryResult> {
  const sql = `INSERT INTO users (name, password) VALUES (?, ?)`;
  const values = [user.name, user.password];
  return await new Promise((resolve, reject) => {
    pool.query(sql, values, (err) => {
      if (err != null) { reject(err); return; }
      const result: QueryResult = {
        message: "User created successfully",
        data: values,
      };
      resolve(result);
    });
  });
}

async function getUserById(id: string): Promise<QueryResult> {
  const sql = `SELECT * FROM users WHERE id = ?`;
  const values = [id];
  return await new Promise((resolve, reject) => {
    pool.query<OkPacket>(sql, values, (err, result) => {
      if (err != null) { reject(err); return; }
      if (Array.isArray(result) && result.length === 0){ 
        reject({ message: "User not found" }); 
        return; 
      }
      const queryResult: QueryResult = {
        message: "User found",
        data: result,
      };
      resolve(queryResult);
    });
  });
}

async function getUsers(): Promise<QueryResult> {
  const sql = `SELECT * FROM users`;
  return await new Promise((resolve, reject) => {
    pool.query(sql, (err, rows) => {
      if (err != null) { reject(err); return; }
      const result: QueryResult = {
        message: "Users found",
        data: rows,
      };
      resolve(result);
    });
  });
}

async function updateUserById(id: string, user: User): Promise<QueryResult> {
  const sql = `UPDATE users SET name = ?, password = ? WHERE id = ?`;
  const values = [user.name, user.password, id];
  return await new Promise((resolve, reject) => {
    pool.query<OkPacket>(sql, values, (err, result) => {
      if (err != null) { reject(err); return; }
      if (result.affectedRows === 0)
        { reject({ message: "User not found" }); return; }
      const queryResult: QueryResult = {
        message: "User updated successfully",
        data: values,
      };
      resolve(queryResult);
    });
  });
}

export default {
  createUser,
  getUserById,
  getUsers,
  updateUserById,
};
