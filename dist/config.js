"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
/**
 * @description import the version 1 controllers.
 */
const controllers_1 = require("./apis/v1/controllers");
/**
 * @description import the version 2 controllers.
 */
const controllers_2 = require("./apis/v2/controllers");
/**
 * @description version 1 API routes
 */
exports.v1 = () => {
    let router = express_1.Router();
    let test = new controllers_1.TestV1();
    router.get('/test', test.find);
    return router;
};
/**
 * @description version 2 API routes
 */
function v2() {
    let router = express_1.Router();
    let test = new controllers_2.TestV2();
    router.get('/test', test.find);
    return router;
}
exports.v2 = v2;
