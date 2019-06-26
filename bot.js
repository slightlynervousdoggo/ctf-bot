const Discord = require('discord.js');
const client = new Discord.Client();

const { token, prefix } = require('./config/config');
const Flag = require('./models/Flag');
const User = require('./models/User');

const startBot = async () => {
  try {
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
                  points: flag.points
                });

                const newFlagSubmitted = {
                  flag: dbFlag.flagNumber
                };

                user.flagsSubmitted.push(newFlagSubmitted);

                await user.save();
              } else {
                const findFlag = foundUser.flagsSubmitted
                  .map(item => item.flag)
                  .indexOf(dbFlag.flagNumber);

                if (findFlag > -1) {
                  return message.channel.send(`Flag already submitted!`);
                }

                const newFlagSubmitted = {
                  flag: dbFlag.flagNumber
                };

                const flagsSubmitted = [
                  ...foundUser.flagsSubmitted,
                  newFlagSubmitted
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

        try {
          if (!foundUser) {
            return message.channel.send(
              `User not found. Please submit flag1 to enter CTF event.`
            );
          }
        } catch (err) {
          message.channel.send(`Oops! Ran into an error!`);
          console.error(err);
        }

        const { points } = foundUser;

        message.channel.send(`${message.author} has ${points} points!`);
      }

      if (command === 'leaderboard') {
        if (args.length > 0) {
          return message.channel.send(`Invalid use of command`);
        }
        const users = await User.find().sort({ points: -1 });

        var leaderboardDisplay = '';
        users.map(user => {
          leaderboardDisplay += `${user.user.username}: ${user.points} points`;
          user.flagsSubmitted.map(flag => {
            leaderboardDisplay += ` ${flag} ☑`;
          });
          leaderboardDisplay += `\n`;
        });
        message.channel.send(
          '```json\n' + '"CTF Leaderboard"\n\n' + leaderboardDisplay + '```'
        );
      }

      if (command === 'help') {
        message.channel.send(`
  \`\`\`md
  - <ctf!flag# [flag_value]>: Submit a flag number to the bot. Replace # with the number, and [flag_value] with the actual flag.
  - <ctf!points>: Show the amount of points you have
  - <ctf!leaderboard>: Show points for all users that are entered.
  \`\`\`
      `);
      }
    });

    client.login(token);
  } catch (err) {
    console.error(`Bot failed to start`, error);
    process.exit(1);
  }
};

module.exports = startBot;
