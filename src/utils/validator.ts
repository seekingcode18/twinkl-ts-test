import { User, ValidationResult } from "../types/interfaces.ts";

export const validateUserInput = (user: User): ValidationResult => {
  if (!user.fullName) return { code: 400, message: "Please provide fullName" };
  if (!user.emailAddress) return { code: 400, message: "Please provide emailAddress" };
  if (!user.createdDate) return { code: 400, message: "Please provide createdDate" };
  if (!user.type) return { code: 400, message: "Please provide a type" };
  if (!validateType(user.type)) return { code: 400, message: "Please provide a valid type (student, teacher, parent, private tutor)" };
  if (!user.password) return { code: 400, message: "Please provide a password" };
  if (!validatePassword(user.password)) return { code: 400, message: "Please provide a valid password between 8 and 64 characters long, with at least one number, one lowercase letter, and one uppercase letter" };

  return { code: 200 };
}

const validatePassword = (password: string) => {
  if (password.length < 8 || password.length > 64) return false;
  if (!password.match(/\d/)) return false;
  if (!password.match(/[a-z]/)) return false;
  if (!password.match(/[A-Z]/)) return false;

  return true;
}

const validateType = (userType: string) => {
  if (!["student", "teacher", "parent", "private tutor"].includes(userType.toLowerCase())) return false;

  return true;
}
