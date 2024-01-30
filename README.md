# School-management Application
### Description

The Online School Catalog is an online web application primarily dedicated to parents, providing them with constant access to students' academic records.

## Docker Setup
<p align="center">
  <a href="https://www.docker.com/" target="blank"><img src="https://upload.wikimedia.org/wikipedia/commons/e/ea/Docker_%28container_engine%29_logo_%28cropped%29.png" width="200" alt="Docker Logo" /></a>
</p>

### Installation
docker-compose up -d


### Docker file

version: "3.8"
services:
  mysql:
    image: mysql:8.0.23
    command: --default-authentication-plugin=mysql_native_password
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: password
    ports:
      - 3306:3306

  postgres:
    image: postgres:13.1
    restart: always
    environment:
      POSTGRES_PASSWORD: password
    ports:
      - 5432:5432

  adminer:
    image: adminer
    restart: always
    ports:
      - 8080:8080
