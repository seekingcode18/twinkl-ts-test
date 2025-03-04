import { Request, Response } from 'express';

const createUser = (req: Request, res: Response) => {
  console.log('createUser', req.body);
  res.sendStatus(200);
}

export {
  createUser
}
