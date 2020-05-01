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
	make build
	npm test

test-coverage:
	npm test -- --coverage