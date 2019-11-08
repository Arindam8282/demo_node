
export class Test {
  
  constructor() {}

  async find(req: any, res: any) {
    setTimeout(() => { return res.status(200).send({ message: 'You are connected to Node.js server.' }); }, 5000);
    // return res.status(200).send({ message: 'You are connected to Node.js server.' });
  }

}