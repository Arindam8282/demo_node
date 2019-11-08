import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import os from 'os';
import cors from 'cors';
import { config } from 'dotenv';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static(`${os.tmpdir()}/public`));
// app.use(cors({ origin: require('./environment/').ao }));

import api from './config';
app.use('/api/v1', api);

config();
const server = new http.Server(app);

/**
 * @description Local server listen.
 */
server.listen(5000);