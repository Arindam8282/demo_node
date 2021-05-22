import Core from './core'
import model from '../model'

export default class Department extends Core {

  constructor() {
    const name: string = 'department'
    super(name, model.department)
  }

}

