const { Client, Collection, MessageEmbed } = require('discord.js');
const { readdirSync } = require('fs');
const { Manager } = require('erela.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { initialize } = require('./Top-gg');

class Bruh extends Client {
	constructor(options) {
		super(options);
		this.defaultPrefix = 'bruh';
		this.color = 0x009874;

		// Hauntless#3212, Cats Are Awesome#3153, Dauntless#0711, Polaris#0525, BotDevelopment#4911
		this.owners = ['749732650209640529', '679867543066116169', '266432078222983169', '673612822495756354', '840396899139452948'];

		// Hauntless#3212, Cats Are Awesome#3153, Dauntless#0711, Polaris#0525, DuskyLunar#4205, Beast.#3430, 🌸 𝓢𝓢| ❃ West ♡#4950, BotDevelopment#4911
		this.botmoderators = ['749732650209640529', '679867543066116169', '266432078222983169', '673612822495756354', '783103759626534942', '460622620522446867', '277969198401978379', '745848018514870404', '840396899139452948'];

		// Colors and the config file.
		this.colors = require('../lib/json/colors.json');
		this.config = require('../lib/json/config.json');

		// The prefix cache.
		this.prefixCache = {};

		// The bot's utilities.
		this.utils = require('../core/Utils');

		// Database functions.
		this.db = require('../core/DBFunctions');

		// Commands and cooldown collections.
		this.commands = new Collection();
		this.globalApplicationCommands = new Collection();
		this.cooldowns = new Collection();

		// Lavalink Erela.js manager.
		this.manager = new Manager({
			nodes: [{ host: process.env.LAVALINKHOST, port: parseInt(process.env.LAVALINKPORT), password: process.env.LAVALINKPASS }],
			send(id, payload) {const guild = this.guilds.cache.get(id);if (guild) guild.shard.send(payload);} })
			.on('nodeConnect', (node) => {console.log(`[Node Lavalink Connection] The node: ${node.options.identifier} has connected on port ${process.env.LAVALINKPORT}.`);})
			.on('nodeError', (node, error) => {console.log(`[Node Lavalink Error] The node: ${node.options.identifier} emitted an error on port ${process.env.LAVALINKPORT}:\n${error.message}`);})
			.on('trackStart', (player, track) => {this.channels.cache.get(player.textChannel).send({ content: `Now playing: ${track.title}.` });})
			.on('queueEnd', (player) => {this.channels.cache.get(player.textChannel).send({ content: 'The queue has ended.' });player.destroy();});
	}

	// Load the client's commands.
	loadCommands() {
		const commandFolders = readdirSync('commands');

		for (const category of commandFolders) {
			const commandFiles = readdirSync(`commands/${category}`);

			for (const file of commandFiles) {
				const command = require(`../commands/${category}/${file}`);

				if (!command.name) {console.error(`The file \`${category}/${file}\` is missing a command name.`);} else if (!command.execute) {console.error(`The file \`${category}/${file}\` is missing an \`execute\` function.`);} else {command.category = category;}
				this.commands.set(command.name, command);
			}
		}
	}

	// Load the client's global application command interactions.
	loadGlobalApplicationCommands() {
		const commandFiles = readdirSync('interactions').filter(file => file.endsWith('.js'));

		for (const file of commandFiles) {
			const command = require(`../interactions/${file}`);

			if (!command.name) {console.error(`The file \`${file}\` is missing a command name.`);}
			if (!command.description) {console.error(`The file \`${file}\` is missing an \`description\`.`);}
			if (!command.execute) {console.error(`The file \`${file}\` is missing an \`execute\` function.`);}

			this.globalApplicationCommands.set(command.name, command);
		}

		// eslint-disable-next-line no-unused-vars
		const command = this.globalApplicationCommands.map(({ execute, ...data }) => data);

		const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

		(async () => {
			try {
				console.log('[Discord] Refreshing global application command interactions.');

				await rest.put(
					Routes.applicationCommands(process.env.CLIENTID),
					{ body: command },
				);

				console.log('[Rest Discord] Reloaded global application command interactions.');
			} catch (error) {
				console.error(`[Rest Discord] ${error.stack}`);
			}
		})();
	}

	// Loads the bot's events.
	loadEvents() {
		const eventFiles = readdirSync('events').filter(file => file.endsWith('.js'));

		for (const file of eventFiles) {
			const event = require(`../events/${file}`);

			if (!event.name) {console.error(`The file \`${file}\` is missing an event name.`);}
			if (!event.execute) {console.error(`The file \`${file}\` is missing an \`execute\` function.`);}

			if (event.once) {
				this.once(event.name, (...args) => event.execute(...args, this));
			} else {
				this.on(event.name, (...args) => event.execute(...args, this));
			}
		}
	}

	// Create an embed.
	makeEmbed(data) {
		return new MessageEmbed(data)
			.setColor(this.color);
	}

	// The login method to initiate the bot.
	login(token) {
		// Load all the client's application commands, and regular commandsconst Discord = require('discord.js');
		this.loadCommands();
		this.loadGlobalApplicationCommands();

		// Load the client events.
		this.loadEvents();

		// Initiate the Top.gg app server.
		initialize();

		super.login(token);
	}
}

module.exports = Bruh;