# Example app

## Getting started

1. Create `.env`-file to project root and make changes:

```
COMPOSE_PROJECT_NAME=example_app
TZ=Europe/Helsinki

CLIENT_PUBLIC_PORT=3000
CLIENT_CONTAINER_PORT=3000

SERVER_PUBLIC_PORT=8000
SERVER_CONTAINER_PORT=8000

PHPMYADMIN_PUBLIC_PORT=8001
PHPMYADMIN_CONTAINER_PORT=80

DATABASE_ROOT_PASSWORD=example
```

2. Start the docker containers (`docker-compose up --build`) (you can also use detached mode with `docker-compose up -d --build`)
<hr/>

## Steps to use [sequelize-cli](https://www.npmjs.com/package/sequelize-cli)

- Go inside database container(`docker-compose exec database bash`)
- `mysql -uroot -p$MARIADB_ROOT_PASSWORD`
- Create database (sequelize_cli db:create` not working with MariaDB) (`CREATE DATABASE example_database;`)
- Exit from database container
- Go inside server container (`docker-compose exec server sh`)

- Install npm packages (`yarn install`)

- `cd src/sequelize`
- Initialize sequelize-cli (`npx sequelize-cli init`)
- [Optional] replace `config/config.json` with `config/config.js` (to be able to read from environment variables like password) file with following contents (make necessary changes):

```
module.exports = {
database: "example_database",
username: "root",
password: process.env.DATABASE_ROOT_PASSWORD,
dialect: "mariadb",
host: "database",
port: "3306",
};
```

- Create models (example:`User`-model `npx sequelize-cli model:generate --name User --attributes username:string,name:string,email:string,password:string,bio:string`)
- Run migrations for models (`npx sequelize-cli db:migrate`)
- [Optional] Create seed data for models (example: `npx sequelize-cli seed:generate --name user`)
- [Optional] Insert seed data to database (`npx sequelize-cli db:seed:all`)

Useful links:

- [sequelize](https://www.npmjs.com/package/sequelize)
- [sequelize-cli](https://www.npmjs.com/package/sequelize-cli)
- [options for config.js](https://stackoverflow.com/a/53574762/17193833)
- [Getting-started-with-sequelize-cli](https://levelup.gitconnected.com/getting-started-with-sequelize-cli-c33c797f05c6)
