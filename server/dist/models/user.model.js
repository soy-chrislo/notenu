"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dbPool_1 = __importDefault(require("../config/dbPool"));
function createUser(user) {
    const sql = `INSERT INTO users (name, password) VALUES (?, ?)`;
    const values = [user.name, user.password];
    return new Promise((resolve, reject) => {
        dbPool_1.default.query(sql, values, (err) => {
            if (err)
                return reject(err);
            const result = {
                message: 'User created successfully',
                data: values
            };
            resolve(result);
        });
    });
}
function getUserById(id) {
    const sql = `SELECT * FROM users WHERE id = ?`;
    const values = [id];
    return new Promise((resolve, reject) => {
        dbPool_1.default.query(sql, values, (err, result) => {
            if (err)
                return reject(err);
            if (Array.isArray(result) && result.length === 0)
                return reject({ message: 'User not found' });
            const queryResult = {
                message: 'User found',
                data: result
            };
            resolve(queryResult);
        });
    });
}
function getUsers() {
    const sql = `SELECT * FROM users`;
    return new Promise((resolve, reject) => {
        dbPool_1.default.query(sql, (err, rows) => {
            if (err)
                return reject(err);
            const result = {
                message: 'Users found',
                data: rows
            };
            resolve(result);
        });
    });
}
function updateUserById(id, user) {
    const sql = `UPDATE users SET name = ?, password = ? WHERE id = ?`;
    const values = [user.name, user.password, id];
    return new Promise((resolve, reject) => {
        dbPool_1.default.query(sql, values, (err, result) => {
            if (err)
                return reject(err);
            if (result.affectedRows === 0)
                return reject({ message: 'User not found' });
            const queryResult = {
                message: 'User updated successfully',
                data: values
            };
            resolve(queryResult);
        });
    });
}
exports.default = {
    createUser,
    getUserById,
    getUsers,
    updateUserById
};
