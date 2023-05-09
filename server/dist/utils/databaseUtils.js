"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dbPool_1 = __importDefault(require("../config/dbPool"));
function executeQuery(sql, params) {
    return new Promise((resolve, reject) => {
        if (params) {
            dbPool_1.default.query(sql, params, (err, rows) => {
                if (err)
                    return reject(err);
                if (rows.length === 0)
                    return reject({ message: "No rows found" });
                resolve(rows);
            });
        }
        else {
            dbPool_1.default.query(sql, (err, rows) => {
                if (err)
                    return reject(err);
                resolve(rows);
            });
        }
    });
}
exports.default = {
    executeQuery
};
