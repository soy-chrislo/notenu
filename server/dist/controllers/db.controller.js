"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPermissionsByUserId = exports.getRolesByUserId = exports.getTable = exports.getTables = void 0;
const utils_1 = require("../utils");
const { executeQuery } = utils_1.databaseUtils;
const getTables = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rows = yield executeQuery("SHOW TABLES");
        res.json(rows);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.getTables = getTables;
const getTable = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tableName = req.params.name;
    try {
        const rows = yield executeQuery(`SELECT * FROM ${tableName}`);
        res.json(rows);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.getTable = getTable;
const getRolesByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const table = "roles_users";
    const sql = `SELECT * FROM ${table} WHERE user_id = ?`;
    const userId = req.params.id;
    try {
        const rows = yield executeQuery(sql, [userId]);
        if (rows.length > 0) {
            const result = rows.reduce((acc, { user_id, rol_id }) => {
                acc.user_id = user_id;
                if (acc.roles_id.indexOf(rol_id) === -1) {
                    acc.roles_id.push(rol_id);
                }
                return acc;
            }, { user_id: null, roles_id: [] });
            res.json(result);
        }
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.getRolesByUserId = getRolesByUserId;
const getPermissionsByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const table = "permissions_users";
    const sql = `SELECT * FROM ${table} WHERE user_id = ?`;
    const userId = req.params.id;
    try {
        const rows = yield executeQuery(sql, [userId]);
        if (rows.length > 0) {
            const result = rows.reduce((acc, { user_id, permission_id }) => {
                acc.user_id = user_id;
                if (acc.permissions_id.indexOf(permission_id) === -1) {
                    acc.permissions_id.push(permission_id);
                }
                return acc;
            }, { user_id: null, permissions_id: [] });
            res.json(result);
        }
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.getPermissionsByUserId = getPermissionsByUserId;
