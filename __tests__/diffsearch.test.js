import { test, expect } from '@jest/globals';
import diffsearch from '../dist/diffsearch.js';

test('gendiff', () => {
  expect(diffsearch('before.json', 'after.json')).toEqual(
    '{\n  + verbose: true\n    host: hexlet.io\n  + timeout: 20\n  - timeout: 50\n  - proxy: 123.234.53.22\n  - follow: false\n}',
  );
});
