import { Request, Response } from 'express';
import { validateUserInput } from '../utils/validator.ts';
import { User } from '../types/interfaces.ts';
import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { insertUser, selectUser } from '../services/users.ts';

const sqlite = new Database('sqlite.db');
const db = drizzle(sqlite);

const createUser = async (req: Request<{}, {}, User>, res: Response) => {
  const validationResult = validateUserInput(req.body);

  if (validationResult.code == 400) {
    res.status(400).json({ message: validationResult.message });
  }

  if (validationResult.code == 200) {
    const user = await insertUser(req.body);

    res.status(200).json({ message: "User received", user });
  }
}

const getUser = async (req: Request<{ id: number }, {}>, res: Response<User | { message: string }>) => {
  const user = await selectUser(req.params.id);

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: `User not found` });
  }
}

export {
  createUser,
  getUser,
}
