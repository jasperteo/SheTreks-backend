# About

SheTreks is an app for solo female travellers, providing a platform to connect, share experiences, and explore together safely. With this app, you can filter activities based on your interests and join in on adventures with other like-minded travellers.

Travelling alone doesn't have to be lonely anymore.

## Installation

This is the backend server for the application. The Bun server runs on [Hono](https://github.com/honojs/hono) ![logos--hono](https://github.com/jasperteo/SheTreks-backend/assets/12832610/c13f4072-8e2e-4fea-9aca-e68d38d47f77) as the web framework and uses [Bun](https://github.com/oven-sh/bun) ![logos--bun](https://github.com/jasperteo/SheTreks-frontend/assets/12832610/f90039c3-38ee-4fb5-8ff0-1edabc38b65e) as the package manager and JavaScript runtime. It interfaces with the [PostgreSQL](https://github.com/postgres/postgres) ![logos--postgresql](https://github.com/jasperteo/SheTreks-backend/assets/12832610/bcee447e-e65f-4a2f-b585-3ca3e628ad61) database via [Sequelize](https://github.com/sequelize/sequelize) ![logos--sequelize](https://github.com/jasperteo/SheTreks-backend/assets/12832610/29f395ca-12d0-451b-b6d5-d454fa10582c) as the object–relational mapping tool.

Refer to the [frontend repository](https://github.com/jasperteo/SheTreks-frontend) to get everything set up in order to run the application. Set up the environment variables before starting.

Install the dependencies:
```bash
bun install
```
Create the database:
```bash
bunx sequelize db:create
```
Run migrations:
```bash
bunx sequelize db:migrate
```
Initialize dummy data:
```bash
bunx sequelize db:seed:all
```
Run the server:
```bash
bun start
```

## Libraries used:

- [Hono](https://github.com/honojs/hono) ![logos--hono](https://github.com/jasperteo/SheTreks-backend/assets/12832610/c13f4072-8e2e-4fea-9aca-e68d38d47f77)
- [Sequelize](https://github.com/sequelize/sequelize) ![logos--sequelize](https://github.com/jasperteo/SheTreks-backend/assets/12832610/29f395ca-12d0-451b-b6d5-d454fa10582c)
- [Node Postgres](https://github.com/brianc/node-postgres) ![logos--postgresql](https://github.com/jasperteo/SheTreks-backend/assets/12832610/bcee447e-e65f-4a2f-b585-3ca3e628ad61)
- [Clerk](https://github.com/clerk/javascript) ![simple-icons--clerk](https://github.com/jasperteo/SheTreks-frontend/assets/12832610/3cd6518a-c811-423b-b94d-1b3cd368fe86)

## Contributors

Development Team: [Esther](https://github.com/estherphang), [Iffah](https://github.com/IffahA) and [Jasper](https://github.com/jasperteo)

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)

