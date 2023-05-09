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
const utils_1 = require("../utils");
const { executeQuery } = utils_1.databaseUtils;
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({
                message: 'Username and password are required'
            });
        }
        ;
        const query = "SELECT * FROM users WHERE username = ? AND password = ?";
        const params = [username, password];
        try {
            const rows = yield executeQuery(query, params);
            if (rows.length === 0) {
                return res.status(401).json({
                    message: 'Credentials are not valid'
                });
            }
            const user = rows[0];
            res.status(200).json({
                message: 'Login success',
                user: {
                    id: user.id,
                    username: user.username,
                    roles: user.roles,
                    permissions: user.permissions
                }
            });
        }
        catch (err) {
            console.error(err);
            res.status(500).json({
                message: 'login error'
            });
        }
    });
}
exports.default = {
    login
};
