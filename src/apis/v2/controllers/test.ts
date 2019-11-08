import { Request, Response } from 'express';

export class TestV2 {
  
  constructor() {}

  async find(req: Request, res: Response) {
    setTimeout(() => { return res.status(200).send({ message: 'You are connected to Node.js server. But the response is 3 seconds delayed.' }); }, 3000);
  }

}