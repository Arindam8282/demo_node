import Core from './core'
import model from '../model'

export default class Car extends Core {

  constructor() {
    const name: string = 'car'
    super(name, model.car)
  }

}

