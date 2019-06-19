# CTF-Bot

Simple discord bot for ctf event.

- Submit flags to the bot
- Awards points and creates a leaderboard for users

### Commands

- **ctf!flag# [flag_value]**: Submit a flag number to the bot. Replace _#_ with the number, and _[flag_value]_ with the actual flag.
- **ctf!points**: Show points for the current user
- **ctf!leaderboard**: Show a leaderboard containing points of everyone that's entered

### Installation

Install the dependencies and devDependencies and start the server.

```sh
$ cd ctf-bot
$ npm install
$ npm run server
```

For production environments...

- Install pm2 globally
- Generate a ecosystem.config.js with `pm2 ecosystem`
- Enter the enviromental variables listed below under the env object

```sh
cd ctf-bot
$ npm i --production
$ npm start
```

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
