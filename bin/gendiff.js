#!/usr/bin/env node

import program from 'commander';
import fs from 'fs';

program.version('0.0.1').description('Compares two configuration files and shows a difference.');

program
  .option('-f, --format [type]>', 'output format')
  .arguments('<firstFileName> <secondFileName>')
  .action((firstFileName, secondFileName) => {
    const firstFile = fs.readFileSync(firstFileName, 'utf8');
    const secondFile = fs.readFileSync(secondFileName, 'utf8');
    const a = JSON.parse(firstFile);
    const b = JSON.parse(secondFile);
    const obj = Object.assign(b);
    console.log('obj');
  });
// двойной цикл, пока ничего умнее не придумал
program.parse(process.argv);
