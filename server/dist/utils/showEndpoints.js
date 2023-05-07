"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_list_endpoints_1 = __importDefault(require("express-list-endpoints"));
function showEndpoints(app) {
    const endpoints = (0, express_list_endpoints_1.default)(app).map((endpoint) => `${endpoint.methods} - ${endpoint.path}`);
    console.log(endpoints);
}
exports.default = showEndpoints;
