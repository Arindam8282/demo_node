import mongoose, { Model, Schema, Document, SchemaDefinition } from 'mongoose'
import Core from './core'

/**
 * @description Project version control
 */
export default class Department extends Core {

  constructor() {
    const name: string = 'department'
    const schema: SchemaDefinition = {
      name: { type: String, required: true, unique: true }
    }

    // create the schema
    super(name, schema)
  }

}
