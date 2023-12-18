import mongoose, { Connection } from 'mongoose'
import { MongoDB } from '../../../environment'
import Admin from './admin'
import Department from './department'
import Employee from './employee'
import Student from './student'

class Model {
  public admin: Admin
  public department: Department
  public employee: Employee
  public student: Student

  constructor() {
    const mongoUrl: string = `mongodb+srv://${MongoDB.username}:${MongoDB.password}@${MongoDB.host}/${MongoDB.database}?retryWrites=true&w=majority`
    mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    mongoose.set('useCreateIndex', true)

    const db: Connection = mongoose.connection
    db.on('error', console.error.bind(console, 'connection error:'))
    db.once('open', this.onConnection)
    console.log(mongoUrl);
    this.admin = new Admin()
    this.department = new Department()
    this.employee = new Employee()
    this.student = new Student()
  }

  onConnection = () => {
    console.log(`Mongodb: connected to mongodb+srv://${MongoDB.host}/${MongoDB.database}`)
  }
}

export default new Model()
