const { Collection, MessageEmbed, WebhookClient, Permissions } = require('discord.js');
const { stripIndents } = require('common-tags');

const Client = require('./structures/Client');
const mongoose = require('mongoose');
const Guild = require('./models/Guild');
const User = require('./models/User');
const chalk = require('chalk');

require('./core/Extentions');
require('dotenv').config();

const errorWebhook = new WebhookClient(process.env.ERRORWEBHOOKID, process.env.ERRORWEBHOOKTOKEN);

const client = new Client({
	intents: 32767,
	allowedMentions: { parse: ['users', 'roles'], repliedUser: false },
	partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'GUILD_MEMBER', 'USER'],
	fetchAllMembers: true,
});

process.on('unhandledRejection', (err) => {
	console.error(`${chalk.red.bold('Unhandled Promise Rejection:')}\n${err.stack}`);
	errorWebhook.send(`**__An Unhandled Promise Rejection happened with ${client.user}:__** ` + err.stack);
});

client.once('ready', () => {
	mongoose.connect(`mongodb+srv://${process.env.MONGODBUSER}:${process.env.MONGODBPASS}@${process.env.MONGODBNAME}.5urdg.mongodb.net/Data`, {
		keepAlive: true,
		useCreateIndex: true,
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	});

	mongoose.connection.on('error', (error) => console.log(error));

	mongoose.connection.on('disconnected', () => console.log('The client has disconnected from the database.'));

	mongoose.connection.on('connected', () => console.log('The client has established a connection with the database.'));

	mongoose.connection.on('reconnect', () => console.log('The client has reconnected to the database.'));

	client.user.setPresence({ activities: [{ name: `${client.defaultPrefix} help`, type: 'PLAYING' }], status: 'online' });

	console.log(`Logged in as ${client.user.tag}.`);
});

client.on('interactionCreate', async (interaction) => {
	if (interaction.isButton()) {console.log('A button interaction was triggered.');}
});

client.on('messageCreate', async (message) => {
	if (message.author.bot || !message.guild) return;

	const user = await User.findOne({ id: message.author.id });
	if (!user) await new User({ id: message.author.id });

	const guild = await Guild.findOne({ id: message.guild.id });
	if (!guild) await new Guild({ id: message.guild.id });

	if (user?.blacklisted) return;
	if (guild?.blacklisted) return;

	if (guild?.autoResponse) {
		if (message.content.match(new RegExp(/^imagine/i))) message.channel.send({ content: 'I can\'t even ' + message.content + ', bro.' });
		if (message.content.match(new RegExp(/^kekw$/i))) message.channel.send({ content: '<:h_KEKW:858770751942557717>' });
		if (message.content.match(new RegExp(/^f$|f in chat$|f in the chat$/i))) message.channel.send({ content: 'f' });
		if (message.content.match(new RegExp(/^(one sec$|one second|sec$|1 second$|1 sec$)/i))) message.channel.send({ content: 'It\'s been one second.' });
		if (message.content.match(new RegExp(/^(ree)/i))) message.channel.send({ content: `R${'E'.repeat(message.content.split(/ +g/)[0].length)}` });
		if (message.content.match(new RegExp(/^(no (?=u{1,}$))/i))) message.channel.send({ content: 'no u' });
		if (message.content.match(new RegExp(/^(no (?=you{1,}$))/i))) message.channel.send({ content: 'no u' });
	}

	const embed = new MessageEmbed()
		.setTitle(`Hello ${message.author.username}!`)
		.setAuthor(client.user.tag, client.user.displayAvatarURL({ dynamic: true, size: 1024 }))
		.setDescription(`<a:h_pepeclap:860614973729538048> Thank you for using me! My default prefix is \`${client.defaultPrefix}\`! <:h_pepesadsit:860712587141971968> If you have the \`MANAGE_GUILD\` permission in this guild, you can also customize the prefix by running the bot's \`prefix\` command!`)
		.setFooter(`Feel free to run "${client.defaultPrefix} help" to see all of my commands and categories! :)`)
		.setTimestamp()
		.setColor(0xA1F4CA);

	if (message.content.match(RegExp(`^<@!?${client.user.id}>$`))) message.reply({ embeds: [embed], allowedMentions: { repliedUser: true } });

	const prefixes = (client.prefixCache[message.guild.id]
        || (await Guild.findOne({ id: message.guild.id }))?.prefixes
        || [client.defaultPrefix]);
	const mapped = prefixes.map(p => RegExp.escape(p));
	mapped.push(`<@!?${client.user.id}> `);

	const match = message.content.match(new RegExp('^' + mapped.join('|')));
	const prefix = match ? match[0] : undefined;
	if (!prefix) return;

	if (!client.prefixCache[message.guild.id]) {client.prefixCache[message.guild.id] = prefixes;}

	const [cmd, args] = client.utils.parseCommand(message.content.slice(prefix.length).trim());
	const input = client.utils.parseArgs(args);
	const commandName = cmd.toLowerCase();

	const command = client.commands.get(commandName)
        || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	const errorEmbed = (msg) => client.makeEmbed({ description: msg, timestamp: message.createdAt });

	if (command.developer && !client.owners.includes(message.author.id)) {
		return message.reply({ embeds: [errorEmbed('Only the bot owners can execute this command!')] });
	}

	if (command.botModerator && !client.botmoderators.includes(message.author.id)) {
		return message.reply({ embeds: [errorEmbed('Only the bot\'s bot moderators can execute this command!')] });
	}

	if (command.userPermissions && !message.member.permissions.any(command.userPermissions.map(perm => Permissions.FLAGS[perm.toUpperCase()]).filter(perm => perm !== undefined), { checkAdmin: true, checkOwner: true })) {
		return message.reply({ embeds: [errorEmbed(stripIndents`
            You are missing the required permissions to execute this command.
            Required Permissions: ${command.userPermissions.map(p => client.utils.formatPerm(p)).join(', ')}`,
		)], allowedMentions: { repliedUser: true } });
	}

	if (command.botPermissions && !message.guild.me.permissions.any(command.botPermissions.map(perm => Permissions.FLAGS[perm.toUpperCase()]).filter(perm => perm !== undefined), { checkAdmin: true, checkOwner: true })) {
		return message.reply({ embeds: [errorEmbed(stripIndents`
            I am missing the required permissions to execute this command.
            Required Permissions: ${command.botPermissions.map(p => client.utils.formatPerm(p)).join(', ')}`,
		)], allowedMentions: { repliedUser: true } });
	}

	if (command.args && !input.args.length) {
		return message.reply({ embeds: [errorEmbed(`You are missing an argument!\nUsage: ${client.user} ${command.usage}`)], allowedMentions: { repliedUser: true } });
	}

	if (command.nsfw && !message.channel.nsfw) {
		return message.reply({ embeds: [errorEmbed('This command can only be executed in a NSFW channel.').setImage('https://images-ext-2.discordapp.net/external/hiWbEzhiEXfFaza5khoxg3mR3OWeugZwWo8vGxK8LzA/https/i.imgur.com/oe4iK5i.gif')], allowedMentions: { repliedUser: true } });
	}

	const { cooldowns } = client;
	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;
	const ocooldownAmount = (command.cooldown || 0) * 0;

	if (timestamps.has(message.author.id)) {
		if (client.owners.includes(message.author.id)) {
			timestamps.get(message.author.id) + ocooldownAmount;
		} else {
			const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
			if (now < expirationTime) {
				const timeLeft = client.utils.timeleft(expirationTime);
				return message.reply({ embeds: [errorEmbed(`You are on a cooldown of ${timeLeft}!`)], allowedMentions: { repliedUser: true } });
			}
		}
	}

	if (client.owners.includes(message.author.id)) {
		timestamps.set(message.author.id, now);
		setTimeout(() => timestamps.delete(message.author.id), ocooldownAmount);
	} else {
		timestamps.set(message.author.id, now);
		setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
	}

	try {
		command.execute(message, input);
	} catch (error) {
		console.error(error);
		message.reply({ embeds: [errorEmbed('Something went wrong while executing the command! The bot developers will investigate this issue.')], allowedMentions: { repliedUser: true } });
		errorWebhook.send({ content: `An error occured with ${client.user} at ${message.guild.name} (${message.guild.id}).\n\nTime: ${new Date()}\n\n${message.author.tag} (${message.author.id}) was the user that tried to execute the command.\n\nCommand name: ${client.utils.capitalize(command.name)}\n\nMessage content: ${message.content}\n\n\n**Error:**\n\`\`\`js\n${error}\n\`\`\`` });
	}
});

client.login(process.env.TOKEN);