import { Request, Response } from 'express'
import Model, { ModelResponse, QueryOption } from '../model/core'
import { Code, DefaultQuery } from '../constant'

export default class Core {

  constructor(
    private name: string,
    private model: Model
  ) {

  }

  generateOption(req: Request): QueryOption {
    const { query } = req
    const option: QueryOption = {
      sort: {},
      skip: !isNaN(Number(query.skip)) ? Number(query.skip) : DefaultQuery.skip,
      limit: !isNaN(Number(query.limit)) ? Number(query.limit) : DefaultQuery.limit,
      select: typeof query.select === 'string' ? query.select.split(',') : [],
      populate: typeof query.populate === 'string' ? query.populate.split(',') : []
    }

    if (typeof query.sort === 'string') {
      option.sort = { [query.sort]: !isNaN(Number(query.order)) ? Number(query.order) : DefaultQuery.sort }
    }

    return option
  }

  generateSearch(req: Request): {} {
    const { query } = req

    if (query.search && typeof query.or === 'string') {
      const keys: string[] = query.or.split(',')
      const search = {
        $or: keys.map((key) => ({
          [key]: { $regex: RegExp(`${query.search}`), $options: 'gi' }
        }))
      }

      return search
    }

    return {}
  }

  create = async (req: Request, res: Response) => {
    const data: ModelResponse = await this.model.create(req.body)

    if (data.error) {
      return res.status(Code.badRequest).send(data.error)
    }

    res.status(Code.created).send({ message: 'success', data })
  }

  find = async (req: Request, res: Response) => {
    // generate the query option
    const option: QueryOption = this.generateOption(req)
    // generate search
    const search: any = this.generateSearch(req)
    // execute the query
    const response: ModelResponse = await this.model.find(search, option)

    if (response.error) {
      return res.status(Code.badRequest).send(response.error)
    }

    res.status(Code.ok).send({ message: { type: 'success' }, data: response.data })
  }
}
