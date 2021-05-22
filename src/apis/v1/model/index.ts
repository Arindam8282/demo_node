import mongoose, { Connection } from 'mongoose'
import { MongoDB } from '../../../environment'
import Department from './department'
import Employee from './employee'

class Model {
  public department: Department
  public employee: Employee

  constructor() {
    const mongoUrl: string = `mongodb+srv://${MongoDB.username}:${MongoDB.password}@${MongoDB.host}/${MongoDB.database}?retryWrites=true&w=majority`
    mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    mongoose.set('useCreateIndex', true)

    const db: Connection = mongoose.connection
    db.on('error', console.error.bind(console, 'connection error:'))
    db.once('open', this.onConnection)

    this.department = new Department()
    this.employee = new Employee()
  }

  onConnection = () => {
    console.log(`Mongodb: connected to mongodb+srv://${MongoDB.host}/${MongoDB.database}`)
  }
}

export default new Model()
