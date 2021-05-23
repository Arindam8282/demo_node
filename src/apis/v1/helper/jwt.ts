import jwt from 'jsonwebtoken'
import { JWT } from '../../../environment'

export default class JWTHelper {
  /**
   * @param {object} {
   *  payload,
   *  option: { expiresIn }, // Default expires in 10 mins
   * }
   * @returns 
   */
  sign (payload: any, option: {} = { expiresIn: 10 * 60 }): string {
    return jwt.sign(payload, JWT.key || 'abc', option)
  }

  async decode (token: string) {
    /**
     * @description token must start with Bearer text.
     */
    let regex = /^(Token\s)/gm
    if(!regex.test(token)) {
      return { error: 'invalid token' }
    }

    /**
     * Remove the Bearer text from token.
     */
    token = token.replace('Token ', '')

    let r: any
    try {
      r = jwt.verify(token, JWT.key || 'abc')
    } catch(e) {
      return { error: e.message }
    }
    return r
  }
}
