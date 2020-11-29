import { Router } from 'express'

/**
 * @description import the version 1 controllers.
 */
import Controller from './apis/v1/controller'

/**
 * @description import the version 1 models.
 */
import Model from './apis/v1/model'

/**
 * @description version 1 API routes
 */
export const v1 = () => {
  /**
   * @description connect the mongodb database
   */
  const router = Router()

  const { car } = Controller

  router.post('/cars', car.create)
  router.get('/cars', car.find)
  router.get('/cars/:_id', car.findOne)
  router.put('/cars/:_id', car.updateOne)
  router.delete('/cars/:_id', car.deleteOne)
  router.post('/cars/search', car.search)

  return { router }
}
