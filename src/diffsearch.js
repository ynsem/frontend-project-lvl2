import _ from 'lodash';
import parse from './parsers.js';
import formater from './formatters/toJson';

// обрабатывает два объекта, возвращая массив с различиями
const diff = (objBefore, objAfter) => {
  // массивы ключей, отдельные и общий без дублей
  const keysBefore = Object.keys(objBefore);
  const keysAfter = Object.keys(objAfter);
  const keys = _.uniq(keysBefore.concat(keysAfter));

  const resultArray = [];

  keys.forEach((item) => {
    // если ключ есть и там и там
    if (_.has(objAfter, item) && _.has(objBefore, item)) {
      // если оба ключа объекты
      if (_.isObject(objBefore[item]) && _.isObject(objAfter[item])) {
        resultArray.push({
          type: ' ',
          key: item,
          value: diff(objBefore[item], objAfter[item]),
        });
      } else if (objBefore[item] === objAfter[item]) {
        // и его значение не менялось
        resultArray.push({ type: ' ', key: item, value: objBefore[item] });
        // иначе, вносим с + и -
      } else {
        resultArray.push({ type: '+', key: item, value: objAfter[item] });
        resultArray.push({ type: '-', key: item, value: objBefore[item] });
      }
    }

    // если в after нет ключа из before, то вносим в resultArray с минусом
    if (!_.has(objAfter, item)) {
      resultArray.push({ type: '-', key: item, value: objBefore[item] });
    }

    // если в before нет ключа из after, то вносим в resultArray с плюсом
    if (!_.has(objBefore, item)) {
      resultArray.push({ type: '+', key: item, value: objAfter[item] });
    }
  });

  return resultArray;
};

const diffSearch = (firstConfig, secondConfig) => {
  // объект полученный преобразованием первого файла
  const objFirst = parse(firstConfig);
  // объект полученный преобразованием второго файла
  const objSecond = parse(secondConfig);

  // return formater(result);

  const result = diff(objFirst, objSecond);
  let resultStr = '{\n';
  resultStr += formater(result, 1);
  resultStr += '}';
  return resultStr;

  // const result = diff(objFirst, objSecond);
  // return result;
};

export default diffSearch;
