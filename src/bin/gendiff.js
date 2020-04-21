#!/usr/bin/env node

import program from 'commander';
import fs from 'fs';
import _ from 'lodash';

const genDiff = (firstConfig, secondConfig) => {
  const firstFile = JSON.parse(fs.readFileSync(firstConfig, 'utf8'));
  const secondFile = JSON.parse(fs.readFileSync(secondConfig, 'utf8'));

  const keysFirst = Object.keys(firstFile);
  const keysSecond = Object.keys(secondFile);

  const resultArray = [];

  for (let i = 0; i < keysFirst.length; i += 1) {
    for (let j = 0; j < keysSecond.length; j += 1) {
      if (keysFirst[i] === keysSecond[j]) {
        if (firstFile[keysFirst[i]] === secondFile[keysSecond[j]]) {
          resultArray.push(`    ${keysFirst[i]}: ${firstFile[keysFirst[i]]}`);
        } else {
          resultArray.push(`  + ${keysSecond[j]}: ${secondFile[keysSecond[j]]}`);
          resultArray.push(`  - ${keysFirst[i]}: ${firstFile[keysFirst[i]]}`);
        }
      }

      if (!_.has(firstFile, keysSecond[j])) {
        resultArray.push(`  + ${keysSecond[j]}: ${secondFile[keysSecond[j]]}`);
      }
    }

    if (!_.has(secondFile, keysFirst[i])) {
      resultArray.push(`  - ${keysFirst[i]}: ${firstFile[keysFirst[i]]}`);
    }
  }

  return `{\n${_.uniq(resultArray).join('\n')}\n}`;
};

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]>', 'output format')
  .arguments('<firstConfig> <secondConfig>')
  .action((pathToFile1, pathToFile2) => {
    const diff = genDiff(pathToFile1, pathToFile2);
    console.log(diff);
  });

program.parse(process.argv);

export default genDiff;
