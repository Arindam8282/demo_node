import mongoose, { Model, Schema, Document, SchemaDefinition } from 'mongoose'
import Core from './core'

/**
 * @description Project version control
 */
export default class Car extends Core {

  constructor() {
    const name: string = 'CrudAppCar'
    const schema: SchemaDefinition = {
      name: { type: String, required: true },
      brand: { type: String, required: true },
      price: { type: Number, required: true },
      photoPath: { type: String }
    }

    // create the schema
    super(name, schema)
  }

}
