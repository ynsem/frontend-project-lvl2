#!/usr/bin/env node

import program from 'commander';
import gendiff from '../index.js';

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]>', 'output format')
  .arguments('<firstConfig> <secondConfig>')
  .action((pathToFile1, pathToFile2) => {
    const diff = gendiff(pathToFile1, pathToFile2);
    console.log(diff);
  });

program.parse(process.argv);
