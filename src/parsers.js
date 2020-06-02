import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';

// Выбирается функция-парсер в зависимости от расширения файла
const parse = (configPath) => {
  let parser;
  const format = path.extname(configPath);
  const data = fs.readFileSync(
    path.resolve(process.cwd(), '__tests__/fixtures', configPath),
    'utf8',
  );

  if (format === '.json') {
    parser = JSON.parse;
  } else if (format === '.yml') {
    parser = yaml.safeLoad;
  } else if (format === '.ini') {
    parser = ini.parse;
  }

  return parser(data);
};

export default parse;
