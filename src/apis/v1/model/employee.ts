import mongoose, { Model, Schema, Document, SchemaDefinition } from 'mongoose'
import Core from './core'

/**
 * @description Project version control
 */
export default class Employee extends Core {

  constructor() {
    const name: string = 'employee'
    const schema: SchemaDefinition = {
      name: { type: String, required: true },
      department: { type: Schema.Types.ObjectId, ref: 'department', required: true }
    }

    // create the schema
    super(name, schema)
  }

}
