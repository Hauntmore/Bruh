const { Client, Collection, MessageEmbed, WebhookClient } = require('discord.js');
const { readdirSync } = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

class Bruh extends Client {
	constructor(options) {
		super({
			intents: 32767,
			allowedMentions: { parse: ['users'], repliedUser: false },
			partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'GUILD_MEMBER', 'USER'],
			presence: { activities: [{ name: `${process.env.DEFAULTPREFIX} help`, type: 'WATCHING' }], status: 'online' },
		}, options);
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

		// Webhooks
		this.errorWebhook = new WebhookClient({ id: process.env.ERRORWEBHOOKID, token: process.env.ERRORWEBHOOKTOKEN });
		this.ticketWebhook = new WebhookClient({ id: process.env.TICKETWEBHOOKID, token: process.env.TICKETWEBHOOKTOKEN });

		// The bot's utilities.
		this.utils = require('../core/Utils');

		// Database functions.
		this.db = require('../core/DBFunctions');

		// Commands and cooldown collections.
		this.commands = new Collection();
		this.globalApplicationCommands = new Collection();
		this.cooldowns = new Collection();
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

	login(token) {
		// Load all the client's application commands, and regular commands.
		this.loadCommands();
		this.loadGlobalApplicationCommands();

		// Load the client events.
		this.loadEvents();

		// Connect to the database.
		this.db.connect(`mongodb+srv://${process.env.MONGODBUSER}:${process.env.MONGODBPASS}@${process.env.MONGODBNAME}.5urdg.mongodb.net/Data`).then(() => {
			console.log('[Mongo] The client has connected to the database.');
		}).catch(err => {
			// If it doesn't connect log the following.
			console.error('[Mongo] The client was unable to connect to the database due to an error:\n' + err);
		});

		// Initiate the bot.
		super.login(token);
	}
}

module.exports = Bruh;