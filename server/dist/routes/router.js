"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const express_1 = require("express");
const router = (0, express_1.Router)();
const basePath = path_1.default.join(__dirname, '..');
const routesPath = path_1.default.join(basePath, 'routes');
const basename = path_1.default.basename(__filename);
const routeFiles = fs_1.default.readdirSync(routesPath).filter((file) => {
    return file !== basename;
});
routeFiles.forEach((file) => {
    const filename = file.split('.')[0];
    const filePath = path_1.default.join(routesPath, file);
    router.use(`/${filename}`, require(filePath).default);
    console.info(`Route ${filename} loaded`);
});
exports.default = router;
