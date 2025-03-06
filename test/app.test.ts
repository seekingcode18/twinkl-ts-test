import request from 'supertest';
import app from '../src/app.ts';
import { User } from '../src/types/interfaces.ts';

describe('POST /users', () => {
  test('returns 200 response given a user', async () => {
    const user: User = {
      fullName: "Christopher King",
      emailAddress: "c@king.com",
      password: "asdASD123",
      createdDate: "01-01-2025T00:00:00",
      type: "student"
    }
    const response = await request(app).post('/users').send(user);

    expect(response.statusCode).toBe(200);
  })

  test('returns 400 response given no user', async () => {
    const response = await request(app).post('/users').send({});

    expect(response.statusCode).toBe(400);
  })

  test('returns 400 response given user lacking fields', async () => {
    const user: Partial<User> = {
      fullName: "Christopher King",
      emailAddress: "c@king.com",
      createdDate: "01-01-2025T00:00:00",
      type: "student"
    }

    const response1 = await request(app).post('/users').send(user);
    delete user.type;
    const response2 = await request(app).post('/users').send(user);
    delete user.createdDate;
    const response3 = await request(app).post('/users').send(user);
    delete user.emailAddress;
    const response4 = await request(app).post('/users').send(user);
    delete user.fullName;
    const response5 = await request(app).post('/users').send(user);

    expect(response1.statusCode).toBe(400);
    expect(response1.body).toEqual({
      message: "Please provide a password"
    });
    expect(response2.statusCode).toBe(400);
    expect(response2.body).toEqual({
      message: "Please provide a type"
    });
    expect(response3.statusCode).toBe(400);
    expect(response3.body).toEqual({
      message: "Please provide createdDate"
    });
    expect(response4.statusCode).toBe(400);
    expect(response4.body).toEqual({
      message: "Please provide emailAddress"
    });
    expect(response5.statusCode).toBe(400);
    expect(response5.body).toEqual({
      message: "Please provide fullName"
    });
  })

  test('returns 400 response given user with invalid user type', async () => {
    const user: User = {
      fullName: "Christopher King",
      emailAddress: "c@king.com",
      createdDate: "01-01-2025T00:00:00",
      password: "abcABC123",
      type: "admin"
    }

    const response = await request(app).post('/users').send(user);

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      message: "Please provide a valid type (student, teacher, parent, private tutor)"
    });
  })

  test('returns 400 response given user with invalid password', async () => {
    const user: User = {
      fullName: "Christopher King",
      emailAddress: "c@king.com",
      createdDate: "01-01-2025T00:00:00",
      type: "student",
      password: "aA1"
    }

    const response1 = await request(app).post('/users').send(user);
    user.password = "aaaaaaaaAAAA";
    const response2 = await request(app).post('/users').send(user);
    user.password = "aaaaaaaaaaa1";
    const response3 = await request(app).post('/users').send(user);
    user.password = "AAAAAAAAAAA1";
    const response4 = await request(app).post('/users').send(user);

    expect(response1.statusCode).toBe(400);
    expect(response1.body).toEqual({
      message: "Please provide a valid password between 8 and 64 characters long, with at least one number, one lowercase letter, and one uppercase letter"
    });
    expect(response2.statusCode).toBe(400);
    expect(response2.body).toEqual({
      message: "Please provide a valid password between 8 and 64 characters long, with at least one number, one lowercase letter, and one uppercase letter"
    });
    expect(response3.statusCode).toBe(400);
    expect(response3.body).toEqual({
      message: "Please provide a valid password between 8 and 64 characters long, with at least one number, one lowercase letter, and one uppercase letter"
    });
    expect(response4.statusCode).toBe(400);
    expect(response4.body).toEqual({
      message: "Please provide a valid password between 8 and 64 characters long, with at least one number, one lowercase letter, and one uppercase letter"
    });
  })
})
