import { Request, Response } from 'express'
import Model, { ModelResponse, QueryOption, SearchOption } from '../model/core'
import { Code, DefaultQuery } from '../constant'

export default class Core {

  constructor(
    private model: Model
  ) {

  }

  generateOption(req: Request): QueryOption {
    const { query } = req
    const option: QueryOption = {
      sort: {},
      skip: !isNaN(Number(query.skip)) ? Number(query.skip) : DefaultQuery.skip,
      limit: !isNaN(Number(query.limit)) ? Number(query.limit) : DefaultQuery.limit,
      select: typeof query.select === 'string' ? query.select.split(',') : DefaultQuery.select,
      populate: typeof query.populate === 'string' ? query.populate.split(',') : DefaultQuery.populate
    }

    if (typeof query.sort === 'string') {
      option.sort = { [query.sort]: !isNaN(Number(query.order)) ? Number(query.order) : DefaultQuery.sort }
    }

    return option
  }

  private generateKeywordSearch(req: Request): {} {
    const { query } = req
    const { json } = this.model

    if (query.search && typeof query.or === 'string') {
      const keys: string[] = query.or.split(',')
      const search = {
        $or: keys.map((key) => {
          // break the object
          const object: any = json[key]
          // return response
          return {
            [key]: !!object?.ref
              ? query.search
              : { $regex: RegExp(`${query.search}`), $options: 'gi' }
          }
        })
      }

      return search
    }

    return {}
  }

  private generateCustomSearch(req: Request): {} {
    const { body: { $or, $and, $nor } } = req
    const { json } = this.model
    const search: SearchOption = {}

    if ($and && typeof $and === 'object' && !!$and.length) {
      search.$and = $and.map((item: any) => {
        Object.keys(item).forEach((key: any) => {
          // break the object
          const object: any = json[key]
          if (typeof item[key] === 'string' && !object?.ref) {
            item = { [key]: { $regex: RegExp(item[key]), $options: 'gi' } }
          }
        })
        return item
      })
    }

    if ($or && typeof $or === 'object' && !!$or.length) {
      search.$or = $or.map((item: any) => {
        Object.keys(item).forEach((key: any) => {
          // break the object
          const object: any = json[key]
          if (typeof item[key] === 'string' && !object?.ref) {
            item = { [key]: { $regex: RegExp(item[key]), $options: 'gi' } }
          }
        })
        return item
      })
    }

    if ($nor && typeof $nor === 'object' && !!$nor.length) {
      search.$nor = $nor.map((item: any) => {
        Object.keys(item).forEach((key: any) => {
          // break the object
          const object: any = json[key]
          if (typeof item[key] === 'string' && !object?.ref) {
            item = { [key]: { $regex: RegExp(item[key]), $options: 'gi' } }
          }
        })
        return item
      })
    }

    return search
  }

  create = async (req: Request, res: Response) => {
    const data: ModelResponse = await this.model.create(req.body)

    if (data.error) {
      return res.status(Code.badRequest).send(data.error)
    }

    res.status(Code.created).send({ message: { type: 'success' }, ...data })
  }

  findOne = async (req: Request, res: Response) => {
    // generate the query option
    const option: QueryOption = this.generateOption(req)
    // generate find docs
    const { params } = req
    // execute the query
    const response: ModelResponse = await this.model.findOne(params, option)

    if (response.error) {
      return res.status(Code.badRequest).send(response.error)
    }

    res.status(Code.ok).send({ message: { type: 'success' }, data: response.data })
  }

  find = async (req: Request, res: Response) => {
    // generate the query option
    const option: QueryOption = this.generateOption(req)
    // generate search
    const search: any = this.generateKeywordSearch(req)
    // execute the query
    const response: ModelResponse = await this.model.find(search, option)

    if (response.error) {
      return res.status(Code.badRequest).send(response.error)
    }

    res.status(Code.ok).send({ message: { type: 'success' }, data: response.data })
  }

  updateOne = async (req: Request, res: Response) => {
    // generate the query option
    const option: QueryOption = this.generateOption(req)
    // generate find docs
    const { params, body } = req
    // execute the query
    const response: ModelResponse = await this.model.updateOne(params, body, option)

    if (response.error) {
      return res.status(Code.badRequest).send(response.error)
    }

    res.status(Code.ok).send({ message: { type: 'success' }, data: response.data })
  }

  deleteOne = async (req: Request, res: Response) => {
    // generate the query option
    const option: QueryOption = this.generateOption(req)
    // generate find docs
    const { params } = req
    // execute the query
    const response: ModelResponse = await this.model.deleteOne(params, option)

    if (response.error) {
      return res.status(Code.badRequest).send(response.error)
    }

    res.status(Code.ok).send({ message: { type: 'success' }, data: response.data })
  }

  search = async (req: Request, res: Response) => {
    // generate the query option
    const option: QueryOption = this.generateOption(req)
    // generate search
    const search: any = this.generateCustomSearch(req)
    // execute the query
    const response: ModelResponse = await this.model.find(search, option)

    if (response.error) {
      return res.status(Code.badRequest).send(response.error)
    }

    res.status(Code.ok).send({ message: { type: 'success' }, data: response.data })
  }
}
