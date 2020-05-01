import fs from 'fs';
import _ from 'lodash';
import path from 'path';

const diffSearch = (firstConfig, secondConfig) => {
  const firstFile = JSON.parse(
    fs.readFileSync(path.resolve(process.cwd(), '__tests__/fixtures', firstConfig), 'utf8'),
  );
  const secondFile = JSON.parse(
    fs.readFileSync(path.resolve(process.cwd(), '__tests__/fixtures', secondConfig), 'utf8'),
  );

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

  // переписать!
  return `{\n${_.uniq(resultArray).join('\n')}\n}`;
};

export default diffSearch;
