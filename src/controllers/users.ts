import { Request, Response } from 'express';
import { validateUserInput } from '../utils/validator.ts';
import { User } from '../types/interfaces.ts';
import Database from 'better-sqlite3';
import { users } from '../db/schema.ts';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { eq } from 'drizzle-orm';

const sqlite = new Database('sqlite.db');
const db = drizzle(sqlite);

const createUser = async (req: Request<{}, {}, User>, res: Response) => {
  const validationResult = validateUserInput(req.body);

  if (validationResult.code == 400) {
    res.status(400).json({ message: validationResult.message });
  }

  if (validationResult.code == 200) {
    const [user] = await db.insert(users).values({
      fullName: req.body.fullName,
      emailAddress: req.body.emailAddress,
      password: req.body.password,
      createdDate: req.body.createdDate,
      type: req.body.type,
    }).returning({
      id: users.id,
      fullName: users.fullName,
      emailAddress: users.emailAddress,
      createdDate: users.createdDate,
      type: users.type,
    });

    res.status(200).json({ message: "User received", user });
  }
}

const getUser = async (req: Request<{ id: number }, {}>, res: Response<User | { message: string }>) => {
  const id = req.params.id;
  const [user] = await db.select().from(users).where(eq(users.id, id));

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
