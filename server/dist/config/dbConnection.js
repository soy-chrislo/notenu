"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql2_1 = __importDefault(require("mysql2"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const dbURI = process.env.DB_URI || '';
const dbConnection = mysql2_1.default.createConnection(dbURI);
dbConnection.connect((err) => {
    if (err) {
        console.log('Error connecting to database: ', err);
        return;
    }
    console.log('Connected to database!');
});
exports.default = dbConnection;
