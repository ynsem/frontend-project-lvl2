import { test, expect } from '@jest/globals';
import path from 'path';
import fs from 'fs';
import diffsearch from '../src/diffsearch.js';

const data = fs.readFileSync(
  path.resolve(process.cwd(), '__tests__/fixtures/result'),
  'utf8',
);

test('json', () => {
  expect(diffsearch('before.json', 'after.json')).toEqual(data);
});

test('yaml', () => {
  expect(diffsearch('before.yml', 'after.yml')).toEqual(data);
});

test('ini', () => {
  expect(diffsearch('before.ini', 'after.ini')).toEqual(data);
});
