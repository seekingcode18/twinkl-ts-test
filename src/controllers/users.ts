import { Request, Response } from 'express';
import { validateUserInput } from '../utils/validator.ts';
import { User } from '../types/interfaces.ts';

const createUser = (req: Request<{}, {}, User>, res: Response) => {
  const validationResult = validateUserInput(req.body);

  if (validationResult.code == 400) {
    res.status(400).send(validationResult.message);
  }

  if (validationResult.code == 200) {
    res.status(200).send("User received");
  }
}

export {
  createUser
}
