# CTF-Bot

Simple discord bot for ctf event.

- Submit flags to the bot
- Awards points and creates a leaderboard for users

### Installation

Install the dependencies and devDependencies and start the server.

```sh
$ cd ctf-bot
$ npm install
$ npm run server
```

For production environments...

... not setup yet

### Mongodb

Need a local mongodb server installed. Insert flags manually based on Flag model.

### Enviromental Variables

Rename `env.example` to `.env` and create the following enviromental variables

```sh
NODE_ENV=development
Set your database/API connection information here
MONGOURI=MONGO URI HERE
TOKEN=DISCORD TOKEN HERE
PREFIX=ctf!
```
