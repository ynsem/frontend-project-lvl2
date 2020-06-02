import _ from 'lodash';
import parse from './parsers.js';

const diffSearch = (firstConfig, secondConfig) => {
  // объект полученный преобразованием первого файла
  const firstFile = parse(firstConfig);
  // объект полученный преобразованием второго файла
  const secondFile = parse(secondConfig);

  // массивы ключей объектов
  const keysFirst = Object.keys(firstFile);
  const keysSecond = Object.keys(secondFile);

  const resultArray = [];

  // проходим по всем ключам первого объекта
  for (let i = 0; i < keysFirst.length; i += 1) {
    // проходим по всем ключамвторого объекта
    for (let j = 0; j < keysSecond.length; j += 1) {
      // если ключи совпадают
      if (keysFirst[i] === keysSecond[j]) {
        // если значения равны, записываем пару без изменений в resultArray
        if (firstFile[keysFirst[i]] === secondFile[keysSecond[j]]) {
          resultArray.push(`    ${keysFirst[i]}: ${firstFile[keysFirst[i]]}`);
        // иначе, вносим с + и -
        } else {
          resultArray.push(`  + ${keysSecond[j]}: ${secondFile[keysSecond[j]]}`);
          resultArray.push(`  - ${keysFirst[i]}: ${firstFile[keysFirst[i]]}`);
        }
      }
      // если в первом объекте нет ключа из второго, вносим в resultArray
      if (!_.has(firstFile, keysSecond[j])) {
        resultArray.push(`  + ${keysSecond[j]}: ${secondFile[keysSecond[j]]}`);
      }
    }
    // если во втором объекте нет ключа из первого, вносим в resultArray
    if (!_.has(secondFile, keysFirst[i])) {
      resultArray.push(`  - ${keysFirst[i]}: ${firstFile[keysFirst[i]]}`);
    }
  }

  // переписать!
  return `{\n${_.uniq(resultArray).join('\n')}\n}`;
};

export default diffSearch;
