# distribuidora-luna-api ⚙️

## Tech Stack

| NodeJs | NestJs | TypeScript | PostgreSQL | Sequelize |
| ------ | ------ | ---------- | ---------- | --------- |
| <img height="60" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/node_js.png"> | <img height="60" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/nest_js.png"> | <img height="60" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/typescript.png"> | <img height="60" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/postgresql.png"> | <img height="60" src="https://sequelize.org/img/logo.svg"> |

## DB

For running pending migrations: 
```shell
npx sequelize-cli db:migrate
```
To undo most recent migrations: 
```shell
npx sequelize-cli db:migrate:undo
```
To generate a new migration file:
```shell
npx sequelize-cli migration:generate --name name-of-migration
```

## Managing new objects on the domain

For this we will use the nest cli to integrate  the full stack of a new object, this will be achieved by using:

```shell
nest generate resource name-of-new-object
```
```shell
> REST API
```

This will add into the src directory the new folder of this object with controller, router, entity file to map to db, module, integrate it automatically to the main app and creates its CRUD automatically if it's needed.

After this using a migration file you indicate which table with a given property need to be created, and then generate the migration.


# Example .env file
```shell
DB_HOST=localhost
DB_PORT=5432
DB_USER=[USERNAME]
DB_PASS=[PASSWORD]
DB_NAME=[NAME OF DB]

JWT_SECRET=ba1b46dcbd2663766bf.....

ENVIROMENT=dev
DB_SSL=false
```

# Setting up PostgreSQL with Docker (Make sure the .env file have the desired values cause Docker will use this variables to create the DB instance)
```shell
docker compuse up -d
```