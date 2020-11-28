import Car from './car'

class Controller {

  public car: Car

  constructor() {
    this.car = new Car()
  }

}

export default new Controller()
