import Department from './department'
import Employee from './employee'

class Controller {

  public department: Department
  public employee: Employee

  constructor() {
    this.department = new Department()
    this.employee = new Employee()

  }

}

export default new Controller()
