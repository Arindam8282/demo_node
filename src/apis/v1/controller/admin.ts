import { Request, Response } from 'express'
import Core from './core'
import model from '../model'
import { AdminSchema } from '../model/admin'
import { ModelResponse, QueryOption } from '../model/core'
import helper from '../helper'
import { Code, DefaultQuery } from '../constant'

export default class Admin extends Core {

  constructor() {
    super(model.admin)
  }

  isValidToken = async (req: Request, res: Response) => {
    res.status(Code.ok).send({ message: { type: 'success' }, data: {} })
  }

  login = async (req: Request, res: Response) => {
    // generate body
    const { email, password } = req.body
    // generate the query option
    const option: QueryOption = { ...DefaultQuery, sort: {} }
    // find the response
    const response: ModelResponse = await model.admin.findOne({ email, password }, option)

    if (response.error) {
      return res.status(Code.badRequest).send(response.error)
    }

    // typecasting
    const admin = <AdminSchema> response.data
    const { jwt } = helper
    const output = {
      token: jwt.sign({ _id: admin._id })
    }

    res.status(Code.ok).send({ message: { type: 'success' }, data: output })
  }

}

