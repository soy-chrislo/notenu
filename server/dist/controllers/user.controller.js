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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../models/user.model"));
function getUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield user_model_1.default.getUsers();
            res.json(result);
        }
        catch (err) {
            console.error(err);
            res.status(500).json({
                message: 'Internal server error'
            });
        }
    });
}
function getUserById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const result = yield user_model_1.default.getUserById(id);
            res.json(result);
        }
        catch (err) {
            res.status(500).json({
                message: (err === null || err === void 0 ? void 0 : err.message) || 'Internal server error'
            });
        }
    });
}
function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, password } = req.body;
            const user = { name, password };
            const result = yield user_model_1.default.createUser(user);
            res.json(result);
        }
        catch (err) {
            res.status(500).json({
                message: (err === null || err === void 0 ? void 0 : err.message) || 'Internal server error'
            });
        }
    });
}
function updateUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const { name, password } = req.body;
            const user = { name, password };
            const result = yield user_model_1.default.updateUserById(id, user);
            res.json(result);
        }
        catch (err) {
            res.status(500).json({
                message: (err === null || err === void 0 ? void 0 : err.message) || 'Internal server error'
            });
        }
    });
}
exports.default = {
    getUsers,
    getUserById,
    createUser,
    updateUser
};
