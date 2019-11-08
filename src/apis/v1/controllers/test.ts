import { Request, Response } from 'express';

export class TestV1 {
  
  constructor() {}

  async find(req: Request, res: Response) {
    return res.status(200).send({ message: 'You are connected to Node.js server.' });
  }

}