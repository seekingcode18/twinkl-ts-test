import request from 'supertest';
import app from '../src/app.ts';

describe('POST /users', () => {
  test('returns 200 response given a user', async () => {
    const user = {
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
})
