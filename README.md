# Project Trybe Soccer Club

In this repository there is a Full Stack application, from back-end to front-end, and the front-end was developed by [Trybe](https://github.com/tryber). I was responsible for the development of the API (using TDD), database and application integration through docker-compose.

The API was developed using TypeScript following the principles of SOLID and POO, Sequelize for data modeling, sinon and chai for creation and test stubs.

## Demonstration

![Alt Text](./tfc-2.gif)

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

<!-- ## Users and Login -->

### Returns a login token

```http
   POST /login
```

Request body

```json
{
  "email": "user@user.com", // Be valid and in the database
  "password": "secret_user", // Size greater than 6 and match the email
}
```

Response body

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjU0NTI3MTg5fQ.XS_9AA82iNoiVaASi0NtJpqOQ_gHSHhxrpIdigiT-fc" // Token generated.
}
```

### Returns role

```http
  GET /login/validate
```

In the header

| Authorization | token (created in the previous route) |
| :------------ | :------------------------------------ |

Response body

```json
{ "role": "admin" }
```

<!-- ### Teams -->

### Returns all teams

```http
  GET /teams
```

Response body

```json
[
  {
    "id": 1,
    "teamName": "Avaí/Kindermann"
  },
  ...
]
```

### Returns a team

```http
  GET /teams/${id}
```

| Parameter | Type     | Description                           |
| :-------- | :------- | :------------------------------------ |
| `id`      | `number` | **Required**. The ID to time you want |

Response body

```json
  {
    "id": 1,
    "teamName": "Avaí/Kindermann"
  },
```

<!-- ### Matches -->

### Returns all matches including team name

```http
  GET /matches
```

This route can use query string as a parameter

| Parameter    | Type      | Description                                                                 |
| :----------- | :-------- | :-------------------------------------------------------------------------- |
| `inProgress` | `boolean` | **Optional**. Used to filter ongoing (`true`) or finished (`false`) matches |

Response body

```json
[
  {
    "id": 1,
    "homeTeamId": 16,
    "homeTeamGoals": 1,
    "awayTeamId": 8,
    "awayTeamGoals": 1,
    "inProgress": false,
    "homeTeam": {
      "teamName": "São Paulo"
    },
    "awayTeam": {
      "teamName": "Grêmio"
    }
  },
  ...
]
```

### Create a new match

```http
  POST /matches
```

In the header

| Authorization | token (created in `POST /login`) |
| :------------ | :------------------------------- |

Request body

```json
{
  "homeTeamId": 16, // The value must be the team id
  "awayTeamId": 8, // The value must be the team id
  "homeTeamGoals": 2,
  "awayTeamGoals": 2
}
```

Response body

```json
{
  "id": 1,
  "homeTeamId": 16,
  "homeTeamGoals": 2,
  "awayTeamId": 8,
  "awayTeamGoals": 2,
  "inProgress": true
}
```

### Update matches in progress

```http
  PATCH /matches/${id}
```

| Parameter | Type     | Description                                   |
| :-------- | :------- | :-------------------------------------------- |
| `id`      | `number` | **Required**. The match ID you want to update |

Request boby

```json
{
  "homeTeamGoals": 3,
  "awayTeamGoals": 1
}
```

Response body

```json
{ "message": "Updated" }
```

### Finish a match

```http
  PATCH /matches/${id}/finished
```

| Parameter | Type     | Description                                       |
| :-------- | :------- | :------------------------------------------------ |
| `id`      | `number` | **Required**. The ID of the match you want to end |

Response body

```json
{ "message": "Finished" }
```

<!-- ### Leaderboards -->

### Team ranking

```http
  GET /leaderboard
```

Response body

```json
[
  {
    "name": "Palmeiras",
    "totalPoints": 13,
    "totalGames": 5,
    "totalVictories": 4,
    "totalDraws": 1,
    "totalLosses": 0,
    "goalsFavor": 17,
    "goalsOwn": 5,
    "goalsBalance": 12,
    "efficiency": "86.67"
  },
  ...
]
```

### Ranking of teams with home games

```http
  GET /leaderboard/home
```

Response body

```json
[
  {
    "name": "Santos",
    "totalPoints": 9,
    "totalGames": 3,
    "totalVictories": 3,
    "totalDraws": 0,
    "totalLosses": 0,
    "goalsFavor": 9,
    "goalsOwn": 3,
    "goalsBalance": 6,
    "efficiency": "100.00"
  },
  ...
]
```

### Ranking of teams with away games

```http
  GET /leaderboard/away
```

Response body

```json
[
  {
    "name": "Palmeiras",
    "totalPoints": 6,
    "totalGames": 2,
    "totalVictories": 2,
    "totalDraws": 0,
    "totalLosses": 0,
    "goalsFavor": 7,
    "goalsOwn": 0,
    "goalsBalance": 7,
    "efficiency": "100.00"
  },
  ...
]
```

## Stack used

**Full-stack:** [Docker](https://www.docker.com/)

**Front-end:** [React](https://reactjs.org/), [axios](https://axios-http.com/)

**Back-end:** [Typescript](https://www.typescriptlang.org/), [Express](https://expressjs.com/), [Sequelize](https://sequelize.org/), [Sinon.JS](https://sinonjs.org/), [Chai](https://www.chaijs.com/), [JWT](https://jwt.io/), [bcrypt](https://www.npmjs.com/package/bcrypt)

**Database:** [MySQL](https://www.mysql.com/)
