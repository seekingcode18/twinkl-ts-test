import { User } from '../types/interfaces.ts';
import Database from 'better-sqlite3';
import { users } from '../db/schema.ts';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { eq } from 'drizzle-orm';

const sqlite = new Database('sqlite.db');
const db = drizzle(sqlite);

const insertUser = async (requestBody: User) => {
  const [user] = await db.insert(users).values({
    fullName: requestBody.fullName,
    emailAddress: requestBody.emailAddress,
    password: requestBody.password,
    createdDate: requestBody.createdDate,
    type: requestBody.type,
  }).returning({
    id: users.id,
    fullName: users.fullName,
    emailAddress: users.emailAddress,
    createdDate: users.createdDate,
    type: users.type,
  });

  return user;
}

const selectUser = async (id: number) => {
  const [user] = await db.select().from(users).where(eq(users.id, id));

  return user;
}

export {
  insertUser,
  selectUser
};
