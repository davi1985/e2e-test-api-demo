import { createServer } from 'http';
import { once } from 'events';
import { randomUUID } from 'crypto';

const Database = new Map();

function jsonResponse(data, response) {
  return response.end(JSON.stringify(data));
}

async function handler(request, response) {
  const { method } = request;

  if (method === 'GET') {
    return jsonResponse([...Database.values()], response);
  }

  if (method === 'POST') {
    const body = JSON.parse(await once(request, 'data'));
    const id = randomUUID();
    Database.set(id, body);

    return jsonResponse({ ok: 1 }, response);
  }

  if (method === 'DELETE') {
    Database.clear();
    return jsonResponse({ ok: 1 }, response);
  }

  response.end('Hello Word');
}

export default createServer(handler);
