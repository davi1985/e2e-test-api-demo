import { expect, describe } from '@jest/globals';
import superTest from 'supertest';
import Server from '../../src/server.js';

describe('API E2E Test Suite', () => {
  it('GET / - should return an array', async () => {
    const response = await superTest(Server).get('/');

    const data = JSON.parse(response.text);
    const status = JSON.parse(response.status);

    expect(data).toBeInstanceOf(Array);
    expect(data.length).toEqual(0);
    expect(status).toBe(200);
  });

  it('POST / - should save an item and return ok', async () => {
    const response = await superTest(Server).post('/').send({
      name: 'Davi Silva',
    });

    const expectedResponse = { ok: 1 };
    const status = JSON.parse(response.status);

    expect(JSON.parse(response.text)).toStrictEqual(expectedResponse);

    expect(status).toBe(200);
  });

  it('DELETE / - should remove all items', async () => {
    const response = await superTest(Server).delete('/');

    const expectedResponse = { ok: 1 };
    const status = JSON.parse(response.status);

    expect(JSON.parse(response.text)).toStrictEqual(expectedResponse);
    expect(status).toEqual(200);

    const getResponse = await superTest(Server).get('/');

    expect(JSON.parse(getResponse.text)).toBeInstanceOf(Array);
    expect(JSON.parse(getResponse.text)).toHaveLength(0);
  });
});
