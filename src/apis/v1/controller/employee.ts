import Core from './core'
import model from '../model'

export default class Employee extends Core {

  constructor() {
    const name: string = 'employee'
    super(name, model.employee)
  }

}

