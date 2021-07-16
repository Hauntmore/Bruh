const { Intents, Collection, MessageEmbed, WebhookClient, Permissions } = require('discord.js');
const { stripIndents } = require('common-tags');
const { Manager } = require('erela.js');

const Client = require('./structures/Client');
const mongoose = require('mongoose');
const Guild = require('./models/Guild');
const User = require('./models/User');
const Tags = require('./models/Tags');
const config = require('./lib/json/config.json');
const chalk = require('chalk');

require('./core/Extentions');
require('dotenv').config();

const errorWebhook = new WebhookClient(process.env.ERRORWEBHOOKID, process.env.ERRORWEBHOOKTOKEN);
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

process.on('unhandledRejection', (err) => {
	console.error(`${chalk.red.bold('Unhandled Promise Rejection:')}\n${err.stack}`);
	// errorWebhook.send(`**__An Unhandled Promise Rejection happened with ${client.user}:__** ` + err.stack);
});

client.manager = new Manager({
	nodes: [
		{
			host: process.env.LAVALINKHOST,
			port: 2333,
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
		player.destroy().then(() => {
			nodeWebhook.send('The player has been destroyed.');
		});
	});

client.once('ready', async () => {
	// MongoDB URL login and constructor (You can also remove all three variables and replace it with one entire URL string).
	await mongoose.connect(`mongodb+srv://${process.env.MONGODBUSER}:${process.env.MONGODBPASS}@${process.env.MONGODBNAME}.5urdg.mongodb.net/Data`, {
		keepAlive: true,
		useCreateIndex: true,
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	});

	client.manager.init(client.user.id);

	mongoose.connection.on('error', (error) => console.log(`A mongoose error has occurred!\n${error}`));

	mongoose.connection.on('disconnected', () => console.log('The client has disconnected from the database.'));

	mongoose.connection.on('connected', () => console.log('The client has established a connection with the database.'));

	mongoose.connection.on('reconnect', () => console.log('The client has reconnected to the database.'));

	client.user.setPresence({ activities: [{ name: `${client.defaultPrefix} help`, type: 'PLAYING' }], status: 'online' });

	console.log(`Logged in as ${client.user.tag}.`);
});

client.on('messageUpdate', async (oldMessage, newMessage) => {
	if (newMessage.author?.bot || !newMessage.guild || newMessage.attachments.size >= 1 || newMessage.embeds.size >= 1) return;

	const guildDB = await client.db.guildDB(newMessage.guild.id);

	const embed = new MessageEmbed()
		.setAuthor(newMessage.author?.tag, newMessage.author?.displayAvatarURL({ dynamic: true, size: 1024 }))
		.setDescription(`**Message edited at ${newMessage.channel.name}**\n[${client.utils.link('Jump to Message', newMessage.url)}]`)
		.addField('**Before**:', `${oldMessage.content}`, false)
		.addField('**After**:', `${newMessage.content}`, false)
		.setColor('BLUE')
		.setFooter(`ID: ${newMessage.author.id}`);
	const channel = newMessage.guild.channels.cache.get(guildDB.messageLogsChannel);
	if (channel) {channel.send({ embeds: [embed] });}
});

client.on('messageDelete', async (message) => {
	if (message.author?.bot || !message.guild || message.attachments.size >= 1 || message.embeds.size >= 1) return;

	const guildDB = await client.db.guildDB(message.guild.id);

	const embed = new MessageEmbed()
		.setAuthor(message.author?.tag, message.author?.displayAvatarURL({ dynamic: true, size: 1024 }))
		.setDescription(`**Message deleted at ${message.channel.name}**`)
		.addField('**Content**:', `${message.content}`, false)
		.setColor('BLUE')
		.setFooter(`ID: ${message.author.id}`);
	const channel = message.guild.channels.cache.get(guildDB.messageLogsChannel);
	if (channel) {channel.send({ embeds: [embed] });}
});

client.on('interactionCreate', async (interaction) => {
	if (interaction.isButton()) {console.log('A button interaction was triggered.');}
	if (interaction.inGuild()) {console.log('An interaction was triggered in a guild.');}
	if (interaction.isCommand()) {console.log('A command interaction was triggered.');}
	if (interaction.isMessageComponent()) {console.log('A message component interaction was triggered.');}
	if (interaction.isSelectMenu()) {console.log('A select menu interaction was triggered.');}
});

client.on('guildMemberAdd', async (member) => {
	const guildDB = await client.db.guildDB(member.guild.id);

	let msg = guildDB.joinLogsMessage;
	msg = msg.replaceAll('{user.tag}', `${member.user.tag}`);
	msg = msg.replaceAll('{user.mention}', `${member}`);
	msg = msg.replaceAll('{guild.name}', `${member.guild.name}`);
	msg = msg.replaceAll('{guild.memberCount}', `${member.guild.members.cache.size.toLocaleString()}`);
	const channel = client.channels.cache.get(guildDB.joinLogsChannel);
	if (channel) {channel.send({ content: msg });}
});

client.on('messageCreate', async (message) => {
	if (message.author.bot || !message.guild) return;

	const guild = await Guild.findOne({ id: message.guild.id });

	if (guild?.autoResponse) {
		if (message.content.match(new RegExp(/^imagine/i))) message.channel.send({ content: 'I can\'t even ' + message.content + ', bro.' });
		if (message.content.match(new RegExp(/^kekw$/i))) message.channel.send({ content: '<:h_KEKW:858770751942557717>' });
		if (message.content.match(new RegExp(/^f$|f in chat$|f in the chat$/i))) message.channel.send({ content: 'f' });
		if (message.content.match(new RegExp(/^(one sec$|one second|sec$|1 second$|1 sec$)/i))) message.channel.send({ content: 'It\'s been one second.' });
		if (message.content.match(new RegExp(/^(ree)/i))) message.channel.send({ content: `R${'E'.repeat(message.content.split(/ +g/)[0].length)}` });
		if (message.content.match(new RegExp(/^(no (?=u{1,}$))|(no (?=you{1,}$))/i))) message.channel.send({ content: 'no u' });
	}

	const embed = new MessageEmbed()
		.setTitle(`Hello ${message.author.username}!`)
		.setAuthor(client.user.tag, client.user.displayAvatarURL({ dynamic: true, size: 1024 }))
		.setDescription(`<a:h_pepeclap:860614973729538048> Thank you for using me! My default prefix is \`${client.defaultPrefix}\`! <:h_pepesadsit:860712587141971968> If you have the \`MANAGE_GUILD\` permission in this guild, you can also customize the prefix by running the bot's \`prefix\` command!`)
		.setFooter(`Feel free to run "${client.defaultPrefix} help" to see all of my commands and categories! :)`)
		.setTimestamp()
		.setColor(0xA1F4CA);

	if (message.content.match(RegExp(`^<@!?${client.user.id}>$`))) message.reply({ embeds: [embed], allowedMentions: { repliedUser: true } });

	const userDB = await client.db.userDB(message.author.id);

	if (userDB.afk) {
		if (await User.findOne({ id: message.author.id })) {
			const afkProfile = await User.findOne({ id: message.author.id });
			if (afkProfile.afkMessagesLeft == 0) {
				await client.db.setAFK(message.author.id, 'false', 'null');
				await User.findOneAndUpdate({ id: message.author.id }, { afkMessagesLeft: afkProfile.afkMessagesLeft + 10 });
				message.channel.send({ content: `${message.author.tag}, You are no longer AFK.` });
			} else {
				await User.findOneAndUpdate({ id: message.author.id }, { afkMessagesLeft: afkProfile.afkMessagesLeft - 1 });
			}
		}
	}

	message.mentions.members.forEach(async (m) => {
		const userDB = await client.db.userDB(m.user.id);

		const embed = client.makeEmbed()
			.setTitle('AFK')
			.setAuthor(m.user.tag, m.user.displayAvatarURL({ dynamic: true, size: 1024 }))
			.setDescription(userDB.afkMessage)
			.setTimestamp();
		if (userDB.afk) {
			try {message.channel.send({ embeds: [embed] });} catch (err) {console.log(err);}
		}
	});

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

	const data = await Tags.findOne({ id: message.guild.id, cmd: cmd });
	if (data) {
		let msg = data.response;
		msg = msg.replaceAll('{user.tag}', `${message.author.tag}`);
		msg = msg.replaceAll('{user.username}', `${message.author.username}`);
		msg = msg.replaceAll('{user.mention}', `${message.author}`);
		msg = msg.replaceAll('{guild.name}', `${message.guild.name}`);
		msg = msg.replaceAll('{guild.memberCount}', `${message.guild.members.cache.size.toLocaleString()}`);
		msg = msg.replaceAll('{message.channel}', `${message.channel.name}`);
		msg = msg.replaceAll('{user.nickname}', `${message.member.nickname}`);
		msg = msg.replaceAll('{target.mention}', `${message.mentions.members.last() || message.member}`);
		message.channel.send({ content: msg });
	}

	if (!command) return;

	const chance = Math.floor(Math.random() * 10) + 1;

	if (chance >= 1 && chance <= 6) {
		const coinsGiven = Math.floor(Math.random() * 200) + 70;
		await client.db.addWallet(message.author.id, coinsGiven);

		const bankSpace = Math.floor(Math.random() * 350) + 80;
		await client.db.addBankSpace(message.author.id, bankSpace);
	}

	const errorEmbed = (msg) => client.makeEmbed({ description: msg, timestamp: message.createdAt });

	if (command.developer && !client.owners.includes(message.author.id)) {
		return message.channel.send({ embeds: [errorEmbed('Only the bot owners can execute this command!')] });
	}

	if (!client.owners.includes(message.author.id) && config.disabledCommands.includes(command.name)) return message.channel.send({ content: 'Globally disabled command moment normies:' });

	if (command.botModerator && !client.botmoderators.includes(message.author.id)) {
		return message.channel.send({ embeds: [errorEmbed('Only the bot\'s bot moderators can execute this command!')] });
	}

	if (command.privateServer && message.guild.id !== config.HauntingDevelopment.id) {
		return message.channel.send({ embeds: [errorEmbed('This command can only be executed in Haunting Development!')] });
	}

	if (command.userPermissions && !message.member.permissions.any(command.userPermissions.map(perm => Permissions.FLAGS[perm.toUpperCase()]).filter(perm => perm !== undefined), { checkAdmin: true, checkOwner: true })) {
		return message.channel.send({ embeds: [errorEmbed(stripIndents`
            You are missing the required permissions to execute this command.
            Required Permissions: ${command.userPermissions.map(p => client.utils.formatPerm(p)).join(', ')}`,
		)] });
	}

	if (command.botPermissions && !message.guild.me.permissions.any(command.botPermissions.map(perm => Permissions.FLAGS[perm.toUpperCase()]).filter(perm => perm !== undefined), { checkAdmin: true, checkOwner: true })) {
		return message.channel.send({ embeds: [errorEmbed(stripIndents`
            I am missing the required permissions to execute this command.
            Required Permissions: ${command.botPermissions.map(p => client.utils.formatPerm(p)).join(', ')}`,
		)] });
	}

	if (command.args && !input.args.length) {
		return message.channel.send({ embeds: [errorEmbed(`You are missing an argument!\nUsage: ${client.user} ${command.usage}`)] });
	}

	if (command.guildPremium && !guild?.premium) {
		return message.channel.send({ embeds: [errorEmbed('This command can only be executed in premium servers.')] });
	}

	if (command.nsfw && !message.channel.nsfw) {
		return message.channel.send({ embeds: [errorEmbed('This command can only be executed in a NSFW channel.').setImage('https://images-ext-2.discordapp.net/external/hiWbEzhiEXfFaza5khoxg3mR3OWeugZwWo8vGxK8LzA/https/i.imgur.com/oe4iK5i.gif')] });
	}

	const { cooldowns } = client;
	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;
	const pcooldownAmount = (command.cooldown || 3) * 1000 / 2;
	const ocooldownAmount = (command.cooldown || 3) * 0;

	if (timestamps.has(message.author.id)) {
		if (client.owners.includes(message.author.id)) {
			timestamps.get(message.author.id) + ocooldownAmount;
		} else if (userDB.premium) {
			const expirationTime = timestamps.get(message.author.id) + pcooldownAmount;
			if (now < expirationTime) {
				const timeLeft = client.utils.timeleft(expirationTime);
				return message.channel.send({ content: `<@!${message.author.id}>`, embeds: [errorEmbed(`You are on a premium cooldown of ${timeLeft}!`)] });
			}
		} else {
			const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
			if (now < expirationTime) {
				const timeLeft = client.utils.timeleft(expirationTime);
				return message.channel.send({ content: `<@!${message.author.id}>`, embeds: [errorEmbed(`You are on a cooldown of ${timeLeft}!`)] });
			}
		}
	}

	if (client.owners.includes(message.author.id)) {
		timestamps.set(message.author.id, now);
		setTimeout(() => timestamps.delete(message.author.id), ocooldownAmount);
	} else if (userDB.premium) {
		timestamps.set(message.author.id, now);
		setTimeout(() => timestamps.delete(message.author.id), pcooldownAmount);
	} else {
		timestamps.set(message.author.id, now);
		setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
	}

	try {
		command.execute(message, input);
	} catch (error) {
		console.error(error);
		message.channel.send({ embeds: [errorEmbed('Something went wrong while executing the command!')] });
		errorWebhook.send({ content: `An error occured with ${client.user} at ${message.guild.name} (${message.guild.id}).\n\nTime: ${new Date()}\n\n${message.author.tag} (${message.author.id}) was the user that tried to execute the command.\n\nCommand name: ${client.utils.capitalize(command.name)}\n\nMessage content: ${message.content}\n\n\n**Error:**\n\`\`\`js\n${error}\n\`\`\`` });
	}
});

client.login(process.env.TOKEN);