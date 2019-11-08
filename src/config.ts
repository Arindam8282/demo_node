import express from 'express';

import { Test } from './apis/test/controller';

const api = express.Router();
const test = new Test();

/**
 * @description version 1 API routes
 */
const routes = () => {
  api.get('/test', test.find);

  return api;
};

export default routes();