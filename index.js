const { Intents, WebhookClient } = require('discord.js');
const { Manager } = require('erela.js');

const Client = require('./structures/Client');
const chalk = require('chalk');
const fs = require('fs');

require('./core/Extentions');
require('dotenv').config();

const nodeWebhook = new WebhookClient(process.env.NODEWEBHOOKID, process.env.NODEWEBHOOKTOKEN);

const client = new Client({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MEMBERS,
		Intents.FLAGS.GUILD_BANS,
		Intents.FLAGS.GUILD_EMOJIS,
		Intents.FLAGS.GUILD_INTEGRATIONS,
		Intents.FLAGS.GUILD_WEBHOOKS,
		Intents.FLAGS.GUILD_INVITES,
		Intents.FLAGS.GUILD_VOICE_STATES,
		Intents.FLAGS.GUILD_PRESENCES,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
		Intents.FLAGS.GUILD_MESSAGE_TYPING,
		Intents.FLAGS.DIRECT_MESSAGES,
		Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
		Intents.FLAGS.DIRECT_MESSAGE_TYPING,
	],
	allowedMentions: { parse: ['users', 'roles'], repliedUser: false },
	partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'GUILD_MEMBER', 'USER'],
});

const eventFiles = fs
	.readdirSync('./events')
	.filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, client));
	} else {
		client.on(event.name, (...args) => event.execute(...args, client));
	}
}

process.on('unhandledRejection', (err) => {
	console.error(`${chalk.red.bold('Unhandled Promise Rejection:')}\n${err.stack}`);
	// errorWebhook.send(`**__An Unhandled Promise Rejection happened with ${client.user}:__** ` + err.stack);
});

client.on('raw', (d) => client.manager.updateVoiceState(d));

client.manager = new Manager({
	nodes: [
		{
			host: process.env.LAVALINKHOST,
			port: parseInt(process.env.LAVALINKPORT),
			password: process.env.LAVALINKPASSWORD,
		},
	],
	send(id, payload) {
		const guild = client.guilds.cache.get(id);
		if (guild) guild.shard.send(payload);
	},
})
	.on('nodeConnect', (node) => {
		console.log(`Node ${node.options.identifier} has connected.`);
		nodeWebhook.send(`Node ${node.options.identifier} has connected.`);
	})
	.on('nodeError', (node, error) => {
		console.log(`Node ${node.options.identifier} emitted an error:\n${error.message}`);
		nodeWebhook.send(`Node ${node.options.identifier} emitted an error:\n${error.message}`);
	})
	.on('trackStart', (player, track) => {
		client.channels.cache
			.get(player.textChannel)
			.send(`Now playing: ${track.title}.`);
	})
	.on('queueEnd', (player) => {
		client.channels.cache
			.get(player.textChannel)
			.send('The queue has ended.');
		player.destroy();
	});

client.login(process.env.TOKEN);