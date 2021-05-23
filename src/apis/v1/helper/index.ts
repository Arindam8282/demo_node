import JWT from './jwt'

class Helper {
  public jwt: JWT

  constructor() {
    this.jwt = new JWT()
  }
}

export default new Helper()
