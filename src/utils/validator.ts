import { User } from "../types/interfaces.ts";

export const validateUserInput = (user: User) => {
  if (!user.fullName) return false;
  if (!user.emailAddress) return false;
  if (!user.createdDate) return false;
  if (!user.password) return false;
  if (!user.type) return false;
  if (!validatePassword(user.password)) return false;

  return true;
}

const validatePassword = (password: string) => {
  if (password.length < 8 || password.length > 64) return false;
  if (!password.match(/\d/)) return false;
  if (!password.match(/[a-z]/)) return false;
  if (!password.match(/[A-Z]/)) return false;

  return true;
}
