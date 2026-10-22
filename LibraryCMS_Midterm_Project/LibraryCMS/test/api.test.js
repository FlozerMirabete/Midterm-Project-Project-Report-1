const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const app = require('../server/app');

let server;
let baseUrl;

before(async () => {
  server = app.listen(0);
  await new Promise((resolve, reject) => {
    server.once('listening', resolve);
    server.once('error', reject);
  });
  const address = server.address();
  baseUrl = `http://127.0.0.1:${address.port}`;
});

after(async () => {
  if (server) await new Promise((resolve, reject) => server.close(error => error ? reject(error) : resolve()));
});

test('GET /api/v1/health returns the required status object', async () => {
  const response = await fetch(`${baseUrl}/api/v1/health`);
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { status: 'ok' });
});

test('GET /api/v1/books returns a JSON array', async () => {
  const response = await fetch(`${baseUrl}/api/v1/books`);
  assert.equal(response.status, 200);
  assert.match(response.headers.get('content-type') || '', /application\/json/);
  assert.ok(Array.isArray(await response.json()));
});

test('unknown endpoint returns Problem Details JSON', async () => {
  const response = await fetch(`${baseUrl}/api/v1/does-not-exist`);
  assert.equal(response.status, 404);
  assert.match(response.headers.get('content-type') || '', /application\/problem\+json/);
  const body = await response.json();
  assert.equal(body.status, 404);
  assert.equal(body.title, 'Not Found');
  assert.equal(body.instance, '/api/v1/does-not-exist');
});

test('malformed JSON returns a 400 Problem Details response', async () => {
  const response = await fetch(`${baseUrl}/api/v1/books`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: '{not valid json'
  });
  assert.equal(response.status, 400);
  assert.match(response.headers.get('content-type') || '', /application\/problem\+json/);
  const body = await response.json();
  assert.equal(body.status, 400);
  assert.equal(body.title, 'Bad Request');
});
