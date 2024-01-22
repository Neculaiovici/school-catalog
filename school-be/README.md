## Configuration environment variables 

```bash
#db connection
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=example
DB_DATABASE=example-database

#app config prod
APP_URL=example.com
SUPPORT_EMAIL=example@${APP_URL}
```

## Running the app

```bash
# install dependencies
$ pnpm i

# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```