const Client = require('./structures/Client');
const chalk = require('chalk');

require('./core/Extensions');
require('dotenv').config();

const client = new Client({
	intents: 32767,
	allowedMentions: { parse: ['users'], repliedUser: false },
	partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'GUILD_MEMBER', 'USER'],
});

process.on('unhandledRejection', (err) => {
	console.error(`${chalk.red.bold('[Node Error] Unhandled Promise Rejection:')}\n${err.stack}`);
});

client.login(process.env.TOKEN);