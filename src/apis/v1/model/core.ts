import mongoose, { Model, Schema, Document, SchemaDefinition } from 'mongoose'
import { DefaultQuery } from '../constant'

export interface QueryOption {
  sort: {},
  skip: number,
  limit: number,
  select?: string[],
  populate?: string[]
}

interface ErrorMessage {
  type: string,
  text: string
}

interface ModelError {
  message: ErrorMessage
}

export interface ModelResponse {
  data: Document | Document[] | {},
  error?: ModelError
}

/**
 * @description Core class to handle models
 */
export default class Core {

  private model: Model<Document, {}>

  constructor(
    public name: string,
    public json: SchemaDefinition
  ) {
    const schema: Schema = new Schema(this.json)
    this.model = mongoose.model(this.name, schema)
  }

  /**
   * @description 
   * @param docs looks like ...
   */
  async create(docs: any): Promise<ModelResponse> {
    let r: Document
    try {
      r = await this.model.create(docs)
    } catch (e) {
      return { error: { message: { type: 'error', text: e.message } }, data: {} }
    }

    if (!r) {
      return { error: { message: { type: 'error', text: `can not create ${this.name}` } }, data: {} }
    }

    return { data: r }
  }

  /**
   * @description 
   * @param docs looks like ...
   */
  async findOne(params: any, option: QueryOption): Promise<ModelResponse> {
    let r: Document | null
    try {
      r = await this.model.findOne(params).sort(option.sort).skip(option.skip).limit(option.limit).populate(option?.populate).select(option?.select)
    } catch (e) {
      return { error: { message: { type: 'error', text: e.message } }, data: {} }
    }

    if (!r) {
      return { error: { message: { type: 'error', text: `can not find the ${this.name}` } }, data: {} }
    }

    return { data: r }
  }

  /**
   * @description 
   * @param docs looks like ...
   */
  async find(params: any, option: QueryOption): Promise<ModelResponse> {
    let r: Document[]
    try {
      r = await this.model.find(params).sort(option.sort).skip(option.skip).limit(option.limit).populate(option?.populate).select(option?.select)
    } catch (e) {
      return { error: { message: { type: 'error', text: e.message } }, data: [] }
    }

    return { data: r }
  }

  async updateOne(params: any, docs: any, option: QueryOption) {
    let r: any
    try {
      r = await this.model.updateOne(params, docs, option).sort(option.sort).skip(option.skip).limit(option.limit)
    } catch (e) {
      return { error: { message: { type: 'error', text: e.message } }, data: {} }
    }

    return { data: r }
  }

  async deleteOne(params: any, option: QueryOption) {
    let r: any
    try {
      r = await this.model.deleteOne(params).sort(option.sort).skip(option.skip).limit(option.limit)
    } catch (e) {
      return { error: { message: { type: 'error', text: e.message } }, data: {} }
    }

    return { data: r }
  }
}
