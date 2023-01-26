# Project Trybe Soccer Club

In this repository there is a Full Stack application, from back-end to front-end, and the front-end was developed by [Trybe](https://github.com/tryber). I was responsible for the development of the API (using TDD), database and application integration through docker-compose.

The API was developed using TypeScript following the principles of SOLID and OOP, Sequelize for data modeling, sinon and chai for creation and test stubs.

## Demonstration

## Functionalities

- Login
- View a table with all teams and their rankings
- Filter sorting by home or visitor
- View matches in progress or finished
- Filters matches that are in progress or finished

## Running locally

Clone the project

```bash
  git clone git@github.com:lucas-da-silva/project-trybe-soccer-club.git
```

Enter the project directory

```bash
  cd project-trybe-soccer-club
```

Upload the containers e install the dependencies (required [docker-compose](https://docs.docker.com/compose/install/))

```bash
  npm run compose:up
```

The frontend is configured for port: [3000](http://localhost:3000/leaderboard)

## Running the tests

Enter the backend container with the following command

```bash
  docker exec -it app_backend sh
```

Running the tests

```bash
    npm test
```

## API documentation

<!-- #### Returns a login token

```http
   POST /login
```

| Parameter   | Tipo     | Descrição                                                        |
| :---------- | :------- | :--------------------------------------------------------------- |
| `email`     | `string` | **Obrigatório**. Be valid (`email@email.co`) and in the database |
| `passoword` | `string` | **Obrigatório**. Size greater than 6 and match the email         | -->

## Stack used

**Full-stack:** [Docker](https://www.docker.com/)

**Front-end:** [React](https://reactjs.org/), [axios](https://axios-http.com/)

**Back-end:** [Typescript](https://www.typescriptlang.org/), [Express](https://expressjs.com/), [Sequelize](https://sequelize.org/), [Sinon.JS](https://sinonjs.org/), [Chai](https://www.chaijs.com/), [JWT](https://jwt.io/), [bcrypt](https://www.npmjs.com/package/bcrypt)

**Database:** [MySQL](https://www.mysql.com/)
