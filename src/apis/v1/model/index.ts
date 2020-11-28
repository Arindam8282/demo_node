import mongoose, { Connection } from 'mongoose'
import { MongoDB } from '../../../environment/'
import Car from './car'

class Model {
  public car: Car

  constructor() {
    const mongoUrl: string = `mongodb://${MongoDB.username}:${MongoDB.password}@${MongoDB.host}:${MongoDB.port}/${MongoDB.database}`
    mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    mongoose.set('useCreateIndex', true)

    const db: Connection = mongoose.connection
    db.on('error', console.error.bind(console, 'connection error:'))
    db.once('open', this.onConnection)

    this.car = new Car()
  }

  onConnection = () => {
    console.log(`Mongodb: connected to mongodb+srv://${MongoDB.host}/${MongoDB.database}`)
  }
}

export default new Model()
