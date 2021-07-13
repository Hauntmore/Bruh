const { Client, Collection, MessageEmbed } = require('discord.js');
const { readdirSync } = require('fs');

class Bruh extends Client {
	constructor(options) {
		super(options);
		this.defaultPrefix = 'bruh';
		this.color = 0x009874;
		// Hauntless#3212, Cats Are Awesome#3153, Dauntless#0711, Polaris#0525, BotDevelopment#4911
		this.owners = ['749732650209640529', '679867543066116169', '266432078222983169', '673612822495756354', '840396899139452948'];
		// Hauntless#3212, Cats Are Awesome#3153, Dauntless#0711, Polaris#0525, DuskyLunar#4205, Beast.#3430, 🌸 𝓢𝓢| ❃ West ♡#4950
		this.botmoderators = ['749732650209640529', '679867543066116169', '266432078222983169', '673612822495756354', '783103759626534942', '460622620522446867', '277969198401978379', '745848018514870404'];
		this.colors = require('../lib/json/colors.json');
		this.config = require('../lib/json/config.json');
		this.prefixCache = {};
		this.utils = require('../core/Utils');
		this.db = require('../core/DBFunctions');
		this.commands = new Collection();
		this.cooldowns = new Collection();
	}

	loadCommands() {
		const commandFolders = readdirSync('commands');

		for (const category of commandFolders) {
			const commandFiles = readdirSync(`commands/${category}`);

			for (const file of commandFiles) {
				const command = require(`../commands/${category}/${file}`);
				if (!command.name) {console.error(`The file \`${category}/${file}\` missing a command name.`);} else if (!command.execute) {console.error(`The file \`${category}/${file}\` is missing an \`execute\` function.`);} else {command.category = category;}
				this.commands.set(command.name, command);
			}
		}
	}

	makeEmbed(data) {
		return new MessageEmbed(data)
			.setColor(this.color);
	}

	login(token) {
		this.loadCommands();

		super.login(token);
	}
}

module.exports = Bruh;