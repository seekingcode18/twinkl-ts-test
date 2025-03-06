import { Request, Response } from 'express';
import { validateUserInput } from '../utils/validator.ts';
import { User } from '../types/interfaces.ts';
import Database from 'better-sqlite3';
import { users } from '../db/schema.ts';
import { drizzle } from 'drizzle-orm/better-sqlite3';

const sqlite = new Database('sqlite.db');
const db = drizzle(sqlite);

const createUser = async (req: Request<{}, {}, User>, res: Response) => {
  const validationResult = validateUserInput(req.body);

  if (validationResult.code == 400) {
    res.status(400).json({ message: validationResult.message });
  }

  if (validationResult.code == 200) {
    await db.insert(users).values({
      fullName: req.body.fullName,
      emailAddress: req.body.emailAddress,
      password: req.body.password,
      createDate: req.body.createdDate,
      type: req.body.type,
    });

    res.status(200).json({ message: "User received" });
  }
}

export {
  createUser
}
