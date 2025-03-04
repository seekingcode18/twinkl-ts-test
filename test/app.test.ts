import request from 'supertest';
import app from '../src/app.ts';

describe('POST /users', () => {
  test('returns 200 response', async () => {
    const response = await request(app).post('/users').send({});

    expect(response.statusCode).toBe(200);
  })
})
