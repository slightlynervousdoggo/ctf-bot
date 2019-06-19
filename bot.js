const Discord = require('discord.js');
const client = new Discord.Client();

const connectDB = require('./config/db');
const { token, prefix } = require('./config/config');
const Flag = require('./models/Flag');
const User = require('./models/User');

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
      try {
        const dbFlag = await Flag.findOne({ flagNumber: flag.flagNumber });

        if (msg !== dbFlag.flagValue) {
          message.channel.send('Wrong!');
        } else {
          const { id, username } = message.author;
          const foundUser = await User.findOne({ 'user.id': id });

          if (!foundUser) {
            user = new User({
              user: {
                id,
                username
              },
              points: flag.points,
              flagsSubmitted: dbFlag.flagNumber
            });
            await user.save();
          } else {
            if (foundUser.flagsSubmitted.includes(dbFlag.flagNumber)) {
              return message.channel.send(`Flag already submitted`);
            }

            const flagsSubmitted = [
              ...foundUser.flagsSubmitted,
              dbFlag.flagNumber
            ];

            await User.findOneAndUpdate(
              { 'user.id': id },
              { $inc: { points: flag.points }, $set: { flagsSubmitted } }
            );
          }

          message.channel.send(
            `Correct! ${flag.points} points for ${message.author}!`
          );
        }
      } catch (err) {
        message.channel.send(`Oops! Ran into an error!`);
        console.error(err);
      }
    }
  });
  if (command === 'points') {
    const { id } = message.author;
    const foundUser = await User.findOne({ 'user.id': id });
    const { points } = foundUser;

    message.channel.send(`${message.author} has ${points} points!`);
  }
});

client.login(token);
