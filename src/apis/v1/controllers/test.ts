
export class TestV1 {
  
  constructor() {}

  async find(req: any, res: any) {
    return res.status(200).send({ message: 'You are connected to Node.js server.' });
  }

}