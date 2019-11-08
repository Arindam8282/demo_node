"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const http_1 = __importDefault(require("http"));
const dotenv_1 = require("dotenv");
const config_1 = require("./config");
/**
 * @description create an express application.
 */
const app = express_1.default();
/**
 * @description configure the .env file.
 */
dotenv_1.config();
/**
 * @description parse the request body into the below options.
 */
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
/**
 * @description use public directory as a static directory.
 */
// app.use(express.static(`${__dirname}/public`));
/**
 * @description cross-origin domain blocking.
 */
// app.use(cors({ origin: require('./environment/').ao }));
/**
 * @description bind the version control routes with app.
 */
app.use('/api/v1', config_1.v1());
app.use('/api/v2', config_1.v2());
/**
 * @description create a HTTP server.
 */
const server = new http_1.default.Server(app);
/**
 * @description sail the app on the server with a given PORT.
 */
server.listen(process.env.PORT || 4000);
