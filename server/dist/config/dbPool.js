"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql2_1 = __importDefault(require("mysql2"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const pool = mysql2_1.default.createPool({
    host: process.env.DB_HOST || '',
    port: Number(process.env.DB_PORT) || 3307,
    user: process.env.DB_USER || '',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || '',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
pool.getConnection((err) => {
    var _a;
    if (err) {
        console.log('Error connecting to database: ', err);
        return;
    }
    console.log(`Connected to database ${(_a = process.env.DB_NAME) === null || _a === void 0 ? void 0 : _a.toUpperCase()} on port ${process.env.DB_PORT}.`);
});
exports.default = pool;
