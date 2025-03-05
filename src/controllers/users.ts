import { Request, Response } from 'express';
import { validateUserInput } from '../utils/validator.ts';
import { User } from '../types/interfaces.ts';

const createUser = (req: Request<{}, {}, User>, res: Response) => {
  if (!validateUserInput(req.body)) {
    res.sendStatus(400);
  } else {
    res.sendStatus(200);
  }
}

export {
  createUser
}
