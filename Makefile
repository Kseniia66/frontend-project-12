install:
	npm ci

build:
	npm run build

start:
	npx start-server -s ./frontend/dist

develop:
	make start-backend & make start-frontend