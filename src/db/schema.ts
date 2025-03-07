import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }).notNull(),
  fullName: text().notNull(),
  emailAddress: text().notNull(),
  password: text().notNull(),
  createDate: text().notNull(),
  type: text().notNull(),
});
