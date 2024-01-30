<p align="center">
  <a href="https://github.com/Neculaiovici" target="blank"><img src="https://camo.githubusercontent.com/645c4798681bd7722844bf39da834828b9ba820a00bed84028266248e4a72a12/68747470733a2f2f63646e2d696d616765732d312e6d656469756d2e636f6d2f6d61782f3830302f312a7a654f7634626c447067636f71544c5576666d6258512e706e67" width="200" alt="Nestjs Logo" /></a>
</p>

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
Note: before starting the application, be sure that the docker container is up

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