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
 * @description import the version 1 models.
 */
 import Policy from './apis/v1/policy'

/**
 * @description version 1 API routes
 */
export const v1 = () => {
  /**
   * @description connect the mongodb database
   */
  const router = Router()

  const { admin, department, employee } = Controller

  const { role } = Policy

  /**
   * @description department apis
   */
  router.get('/department', department.find)
  router.post('/department', role.isAuthorized, department.create)
  router.get('/department/:_id', department.findOne)
  router.put('/department/:_id', role.isAuthorized, department.updateOne)
  router.delete('/department/:_id', role.isAuthorized, department.deleteOne)

  /**
   * @description employee apis
   */
  router.get('/employee', employee.find)
  router.post('/employee', role.isAuthorized, employee.create)
  router.get('/employee/:_id', employee.findOne)
  router.put('/employee/:_id', role.isAuthorized, employee.updateOne)
  router.delete('/employee/:_id', role.isAuthorized, employee.deleteOne)
  router.post('/searchemployee', employee.search)

  /**
   * @description admin apis
   */
  router.post('/loginasadmin', admin.login)

  return { router }
}
