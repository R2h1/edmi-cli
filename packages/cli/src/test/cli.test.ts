import path from 'path';
import { version } from '../../package.json';

const CLI = path.join(__dirname, '../../dist/bin/index.js');

let execa: any = null;

const bin =
  () =>
  (...args: any[]) => {
    return execa(CLI, args);
  };

beforeAll(async () => {
  execa = (await import('execa')).execa;
});

test('run error command', async () => {
  let error = null;
  try {
    await bin()('iii');
  } catch (err: any) {
    error = err;
  }
  expect(error.message).toContain("unknown command 'iii'");
});

test('should not throw error when use --help', async () => {
  let error = null;
  try {
    await bin()('--help');
  } catch (err) {
    error = err;
  }
  expect(error).toBe(null);
});

test('show correct version', async () => {
  const { stdout } = await bin()('-V');
  expect(stdout).toContain(version);
});

test('open debug mode', async () => {
  let error = null;
  try {
    await bin()('--debug');
  } catch (err: any) {
    error = err;
  }
  expect(error.message).toContain('debug mode opened');
});
