import { RowDataPacket, ResultSetHeader, OkPacket } from 'mysql2';
import pool from '../config/dbPool';

interface User {
    id?: string;
    name: string;
    password: string;
}

interface QueryResult extends RowData {
  message: string;
  data?: any;
}

interface RowData {
  [key: string]: any;
}

function createUser(user: User): Promise<QueryResult> {
  const sql = `INSERT INTO users (name, password) VALUES (?, ?)`;
  const values = [user.name, user.password];
  return new Promise((resolve, reject) => {
      pool.query(sql, values, (err) => {
          if (err) return reject(err);
          const result: QueryResult = {
            message: 'User created successfully',
            data: values
          };
          resolve(result);
      })
  })
}

function getUserById(id: string): Promise<QueryResult>{
  const sql = `SELECT * FROM users WHERE id = ?`;
  const values = [id];
  return new Promise((resolve, reject) => {
    pool.query<OkPacket>(sql, values, (err, result) => {
      if (err) return reject(err);
      if (Array.isArray(result) && result.length === 0) return reject({ message: 'User not found' });
      const queryResult: QueryResult = {
        message: 'User found',
        data: result
      };
      resolve(queryResult);
    })
  });
}

function getUsers(): Promise<QueryResult> {
  const sql = `SELECT * FROM users`;
  return new Promise((resolve, reject) => {
    pool.query(sql, (err, rows) => {
      if (err) return reject(err);
      const result: QueryResult = {
        message: 'Users found',
        data: rows
      };
      resolve(result);
    })
  });
}

function updateUserById(id:string, user: User): Promise<QueryResult>{
  const sql = `UPDATE users SET name = ?, password = ? WHERE id = ?`;
  const values = [user.name, user.password, id];
  return new Promise((resolve, reject) => {
    pool.query<OkPacket>(sql, values, (err, result) => {
      if (err) return reject(err);
      if (result.affectedRows === 0) return reject({ message: 'User not found' });
      const queryResult: QueryResult = {
        message: 'User updated successfully',
        data: values
      };
      resolve(queryResult);
    })
  });
}

export default {
  createUser,
  getUserById,
  getUsers,
  updateUserById
}