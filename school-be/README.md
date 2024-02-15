<p align="center">
  <a href="https://github.com/Neculaiovici" target="blank"><img src="https://camo.githubusercontent.com/645c4798681bd7722844bf39da834828b9ba820a00bed84028266248e4a72a12/68747470733a2f2f63646e2d696d616765732d312e6d656469756d2e636f6d2f6d61782f3830302f312a7a654f7634626c447067636f71544c5576666d6258512e706e67" width="200" alt="Nestjs Logo" /></a>
</p>

## Configuration environment variables

```bash
# db connection
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=password
DB_DATABASE=school-database

# email
# SMTP Server Hostname : smtp.freesmtpservers.com
# Port : 25
# Auth : None
MAIL_HOST=smtp.freesmtpservers.com
MAIL_USER=test@freesmtpservers.com
MAIL_PASSWORD=topsecret
MAIL_FROM=noreply@freesmtpservers.com

# optional
MAIL_TRANSPORT=smtp://${MAIL_USER}:${MAIL_PASSWORD}@${MAIL_HOST}

# JWT
JWT_EXPIRATION=3000
JWT_SECRET=f9d932014a1ea31c3be1b00aa9448ac0c41ef40c5aba3eae0157423511d108bd662765062178ef3a67091142636a38b6a3b9116cb6a7dcd3f3155cd1f9cb1149

# app config prod
APPLICATION_PORT=3000
APPLICATION_URL=mywbsite.com
SUPPORT_EMAIL=support@${APP_URL}
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

## Docker Setup
<p align="center">
  <a href="https://www.docker.com/" target="blank"><img src="https://upload.wikimedia.org/wikipedia/commons/e/ea/Docker_%28container_engine%29_logo_%28cropped%29.png" width="200" alt="Docker Logo" /></a>
</p>

# Installation
```
$ docker-compose up -d
```
