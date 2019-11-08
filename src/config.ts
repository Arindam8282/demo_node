import { Router } from 'express';

/**
 * @description import the version 1 controllers.
 */
import {
  TestV1
} from './apis/v1/controllers';

/**
 * @description import the version 2 controllers.
 */
import {
  TestV2
} from './apis/v2/controllers';

/**
 * @description version 1 API routes
 */
export const v1 = () => {
  let router = Router();
  let test = new TestV1();

  router.get('/test', test.find);

  return router;
};

/**
 * @description version 2 API routes
 */
export function v2() {
  let router = Router();
  let test = new TestV2();

  router.get('/test', test.find);

  return router;
}
