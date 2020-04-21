install:
	npm install

run:
	npx babel-node src/bin/gendiff.js

build:
	npm run build

publish:
	npm publish --dry-run

lint:
	npx eslint .

test:
	npm test