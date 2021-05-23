import { Request, Response } from 'express'
import helper from '../helper'
import { Code } from '../constant'

export default class Role {

  async isAuthorized(req: Request, res: Response, next: Function) {
    if(!req.headers.authorization) {
      return res.status(Code.unauthorized).send({
        message: {
          type: 'error',
          text: 'please include authorization in header'
        },
        data: {}
      })
    }

    /**
     * @description Decode and Authenticate JWT token.
     */
    const token = await helper.jwt.decode(req.headers.authorization)
    if(token.error) {
      return res.status(Code.unauthorized).send({ message: { type: 'error', text: token.error }, data: {} })
    }

    // update the authorization
    req.headers.authorization = token
    // move into api controller
    next()
  } 
}
