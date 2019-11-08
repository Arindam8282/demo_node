"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const http_1 = __importDefault(require("http"));
const dotenv_1 = require("dotenv");
const app = express_1.default();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
// app.use(express.static(`${os.tmpdir()}/public`));
// app.use(cors({ origin: require('./environment/').ao }));
const config_1 = __importDefault(require("./config"));
app.use('/api/v1', config_1.default);
dotenv_1.config();
const server = new http_1.default.Server(app);
/**
 * @description Local server listen.
 */
server.listen(5000);
