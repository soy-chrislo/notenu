"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function verifyToken(token) {
    try {
        decryptToken(token);
        return true;
    }
    catch (err) {
        return false;
    }
}
function encryptToken(payload) {
    const secret = process.env.JWT_SECRET || 'this_is_not_a_secret';
    const token = jsonwebtoken_1.default.sign(payload, secret, { expiresIn: '1h' });
    return token;
}
function decryptToken(token) {
    const secret = process.env.JWT_SECRET || 'this_is_not_a_secret';
    const payload = jsonwebtoken_1.default.verify(token, secret);
    return payload;
}
exports.default = {
    verifyToken,
    encryptToken,
    decryptToken
};
