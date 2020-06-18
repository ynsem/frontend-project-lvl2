import _ from 'lodash';

const objFormaterFlat = (obj) => {
  let resultStr = '';

  if (_.isObject(obj.value)) {
    resultStr += `${obj.type} ${obj.key}`;
  } else {
    resultStr += `${obj.type} ${obj.key}: ${obj.value}`;
  }

  return resultStr;
};

const formater = (arr, space) => {
  let resultStr = '';

  arr.forEach((item) => {
    resultStr += objFormaterFlat(item, space);

    if (_.isArray(item.value)) {
      resultStr += formater(item.value, 3);
    } else if (_.isObject(item.value)) {
      const obj = item.value;
      if (!Object.prototype.hasOwnProperty.call(obj, 'type')) {
        const keys = Object.keys(item.value);
        keys.forEach((key) => {
          resultStr += `${key}: ${item.value[key]}`;
        });
      }
    }
  });

  resultStr += '';

  return JSON.stringify(resultStr);
};

export default formater;
