import mongoose, { Model, Schema, Document, SchemaDefinition } from 'mongoose'
import { DefaultQuery } from '../constant'

export interface QueryOption {
  sort: {},
  skip: number,
  limit: number,
  select?: string[],
  populate?: string[]
}

export interface SearchOption {
  $and?: [],
  $or?: [],
  $nor?: []
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

  async count(params: any, option: QueryOption): Promise<ModelResponse> {
    let count: number
    try {
      count = await this.model.countDocuments(params)
    } catch (e) {
      return { error: { message: { type: 'error', text: e.message } }, data: {} }
    }

    const pages: number = !(count % option.limit)
      ? count / option.limit
      : Math.floor(count / option.limit) + 1

    const page: number = Math.floor(option.skip / option.limit) + 1

    const formal: boolean = page > pages 
      ? false
      : !(option.skip % option.limit)

    return { data: { pagination: { count, limit: option.limit, page, pages, formal } } }
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

  async updateOne(params: any, docs: any, option: QueryOption): Promise<ModelResponse> {
    let r: any
    try {
      r = await this.model.updateOne(params, docs, option).sort(option.sort).skip(option.skip).limit(option.limit)
    } catch (e) {
      return { error: { message: { type: 'error', text: e.message } }, data: {} }
    }

    if (!r.n) {
      return { error: { message: { type: 'error', text: `can not find the ${this.name}` } }, data: {} }
    }

    return { data: r }
  }

  async deleteOne(params: any, option: QueryOption): Promise<ModelResponse> {
    let r: any
    try {
      r = await this.model.deleteOne(params).sort(option.sort).skip(option.skip).limit(option.limit)
    } catch (e) {
      return { error: { message: { type: 'error', text: e.message } }, data: {} }
    }

    if (!r.n) {
      return { error: { message: { type: 'error', text: `can not find the ${this.name}` } }, data: {} }
    }

    return { data: r }
  }
}
