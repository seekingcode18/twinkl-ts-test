import { insertUser } from '../services/users.ts';

insertUser({
  fullName: "Test User",
  emailAddress: "user@test.com",
  password: "abcABC123",
  createdDate: "01-01-2025T00:00:00",
  type: "teacher"
});
