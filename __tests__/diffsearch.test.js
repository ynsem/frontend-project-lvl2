import { test, expect } from '@jest/globals';
import diffsearch from '../src/diffsearch.js';

test('json', () => {
  expect(diffsearch('before.json', 'after.json')).toEqual(
    '{\n  + verbose: true\n    host: hexlet.io\n  + timeout: 20\n  - timeout: 50\n  - proxy: 123.234.53.22\n  - follow: false\n}',
  );
});

test('yaml', () => {
  expect(diffsearch('before.yml', 'after.yml')).toEqual(
    '{\n  + verbose: true\n    host: hexlet.io\n  + timeout: 20\n  - timeout: 50\n  - proxy: 123.234.53.22\n  - follow: false\n}',
  );
});

test('ini', () => {
  expect(diffsearch('before.ini', 'after.ini')).toEqual(
    '{\n  + verbose: true\n    host: hexlet.io\n  + timeout: 20\n  - timeout: 50\n  - proxy: 123.234.53.22\n  - follow: false\n}',
  );
});
