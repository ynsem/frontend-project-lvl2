import { test, expect } from '@jest/globals';
import path from 'path';
import fs from 'fs';
import diffsearch from '../src/diffsearch.js';

const data = fs.readFileSync(
  path.resolve(process.cwd(), '__tests__/fixtures/result'),
  'utf8',
);

const data1 = fs.readFileSync(
  path.resolve(process.cwd(), '__tests__/fixtures/result1'),
  'utf8',
);

const data2 = fs.readFileSync(
  path.resolve(process.cwd(), '__tests__/fixtures/resultPlain'),
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

test('jsonDeep', () => {
  expect(diffsearch('before1.json', 'after1.json')).toEqual(data1);
});

test('formatPlain', () => {
  expect(diffsearch('before1.json', 'after1.json')).toEqual(data2);
});
