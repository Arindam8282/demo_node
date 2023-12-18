import mongoose, { Model, Schema, Document, SchemaDefinition } from 'mongoose'
import Core from './core'

/**
 * @description Project version control
 */
export default class Student extends Core {

  constructor() {
    const name: string = 'student'
    const schema: SchemaDefinition = {
      name: { type: String, required: true},
      rollno : {type: Number, required:true, unique:true}
    }

    // create the schema
    super(name, schema)
  }

}
