import Admin from './admin'
import Department from './department'
import Employee from './employee'

class Controller {

  public admin: Admin
  public department: Department
  public employee: Employee

  constructor() {
    this.admin = new Admin()
    this.department = new Department()
    this.employee = new Employee()

  }

}

export default new Controller()
