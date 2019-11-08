"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = require("./apis/test/controller");
const api = express_1.default.Router();
const test = new controller_1.Test();
/**
 * @description version 1 API routes
 */
const routes = () => {
    api.get('/test', test.find);
    return api;
};
exports.default = routes();
