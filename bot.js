const Discord = require('discord.js');
const client = new Discord.Client();

const connectDB = require('./config/db');
const { token, prefix } = require('./config/config');
const Flag = require('./models/Flag');

// Connect to Database
connectDB();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on(`message`, async message => {
  // Ignore other bots
  if (message.author.bot) return;

  // Ignore messages without prefix
  if (message.content.indexOf(prefix) !== 0) return;

  // Splice "command" away from "arguments"
  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const command = args.shift().toLowerCase();

  // Get all flags in db
  const flags = await Flag.find();

  flags.map(async flag => {
    if (command === flag.flagNumber) {
      const msg = args.join('');
      const dbflag = await Flag.findOne({ flagNumber: flag.flagNumber });

      if (msg !== dbflag.flagValue) {
        message.channel.send('Wrong!');
      } else {
        message.channel.send(
          `Correct! ${flag.points} points for ${message.author}!`
        );
      }
    }
  });
});

client.login(token);
