install:
	npm ci

build:
	npm run build

start:
	npx start-server -s ./frontend/dist

develop:
	npx start-server & npm -C frontend start