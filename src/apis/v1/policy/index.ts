import Role from './role'

class Policy {
  public role: Role

  constructor() {
    this.role = new Role()
  }
}

export default new Policy()
