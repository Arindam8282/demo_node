import Admin from './admin'
import Department from './department'
import Employee from './employee'
import Student from './student'

class Controller {

  public admin: Admin
  public department: Department
  public employee: Employee
  public student: Student

  constructor() {
    this.admin = new Admin()
    this.department = new Department()
    this.employee = new Employee()
    this.student = new Student()
  }

}

export default new Controller()
