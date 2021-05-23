import mongoose, { Model, Schema, Document, SchemaDefinition } from 'mongoose'
import Core from './core'

export interface AdminSchema {
  _id: string,
  name: string,
  email: string,
  password: string
}

/**
 * @description Project version control
 */
export default class Admin extends Core {

  constructor() {
    const name: string = 'admin'
    const schema: SchemaDefinition = {
      name: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true }
    }

    // create the schema
    super(name, schema)
  }

}
