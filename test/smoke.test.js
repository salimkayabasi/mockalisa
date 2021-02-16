const { fork } = require('child_process');
const { resolve } = require('path');
const got = require('got');

const cwd = process.cwd();
const cliPath = resolve(cwd, './bin/cli.js');
const configPath = resolve(cwd, './test/yml/config.test.yml');

describe('Smoke Test', () => {
  jest.setTimeout(3e4);
  const forkedProcesses = new Set();
  const run = args => {
    const child = fork(cliPath, Array.isArray(args) ? args : [args]);
    forkedProcesses.add(child);
    return child;
  };
  const request = got.extend({
    prefixUrl: 'http://localhost:1881/pet-store/',
    headers: {
      Authorization: 'Bearer TOKEN',
    },
  });
  afterEach(() => {
    forkedProcesses.forEach(child => child.kill());
    forkedProcesses.clear();
  });
  test('Run and test', async () => {
    run(configPath);
    await new Promise(r => setTimeout(r, 5e3));
    const response = await request('pet/findByStatus?status=available');
    expect(response.statusCode).toBe(200);
    const body = JSON.parse(response.body);
    expect(body).toBeInstanceOf(Array);
  });
});
