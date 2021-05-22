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

  const { department, employee } = Controller

  router.get('/department', department.find)
  router.post('/department', department.create)
  router.get('/department/:_id', department.findOne)
  router.put('/department/:_id', department.updateOne)
  router.delete('/department/:_id', department.deleteOne)

  router.get('/employee', employee.find)
  router.post('/employee', employee.create)
  router.get('/employee/:_id', employee.findOne)
  router.put('/employee/:_id', employee.updateOne)
  router.delete('/employee/:_id', employee.deleteOne)
  router.post('/searchemployee', employee.search)

  return { router }
}
