import _ from 'lodash';

const formater = (arr) => {
  let resultStr = '';

  arr.forEach((item) => {
    if (_.isArray(item.value)) {
      formater(item.value);
    } else {
      if (item.type === '-') {
        resultStr += `Property '${item.key}' was deleted\n`;
      }
      if (item.type === '+') {
        resultStr += `Property '${item.key}' was added with value: ${item.value}\n`;
      }
    }
  });

  return resultStr;
};

export default formater;
