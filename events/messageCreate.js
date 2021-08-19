const { Collection, MessageEmbed, Permissions } = require('discord.js');
const { stripIndents } = require('common-tags');

const Guild = require('../models/Guild');
const Tags = require('../models/Tags');
const User = require('../models/User');
const Autoresponse = require('../models/Autoresponse');

module.exports = {
	name: 'messageCreate',
	async execute(message) {
		if (message.author.bot || !message.guild) return;

		const guild = await Guild.findOne({ id: message.guild.id });
		const user = await User.findOne({ id: message.author.id });

		await Autoresponse.find({ id: message.guild.id }, (err, docs) => {
			if (err) {console.log(err);}
			docs.map(doc => {
				if (message.content.includes(doc.trigger)) {
					message.channel.send({ content: doc.content });
				}
			});
		});

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
			.setAuthor(message.client.user.tag, message.client.user.displayAvatarURL({ dynamic: true, size: 1024 }))
			.setDescription(`<a:h_pepeclap:860614973729538048> Thank you for using me! My default prefix is \`${message.client.defaultPrefix}\`! <:h_pepesadsit:860712587141971968> If you have the \`MANAGE_GUILD\` permission in this guild, you can also customize the prefix by running the bot's \`prefix\` command!\n\nCurrent Prefix(es) for ${message.guild.name}: ${guild.prefixes.join(', ')}`)
			.setFooter(`Feel free to run "${message.client.defaultPrefix} help" to see all of my commands and categories! :)`)
			.setTimestamp()
			.setColor(0xA1F4CA);

		if (message.content.match(RegExp(`^<@!?${message.client.user.id}>$`))) message.reply({ embeds: [embed], allowedMentions: { repliedUser: true } });

		const prefixes = (message.client.prefixCache[message.guild.id]
        || (await Guild.findOne({ id: message.guild.id }))?.prefixes
        || [message.client.defaultPrefix]);
		const mapped = prefixes.map(p => RegExp.escape(p));
		mapped.push(`<@!?${message.client.user.id}> `);

		const match = message.content.match(new RegExp('^' + mapped.join('|')));
		const prefix = match ? match[0] : undefined;
		if (!prefix) return;

		if (!message.client.prefixCache[message.guild.id]) {message.client.prefixCache[message.guild.id] = prefixes;}

		const [cmd, args] = message.client.utils.parseCommand(message.content.slice(prefix.length).trim());
		const input = message.client.utils.parseArgs(args);
		const commandName = cmd.toLowerCase();

		const command = message.client.commands.get(commandName)
        || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

		const data = await Tags.findOne({ id: message.guild.id, cmd: cmd });

		let msg = data?.response;
		msg = msg?.replaceAll('{user.tag}', message.author.tag);
		msg = msg?.replaceAll('{user.username}', message.author.username);
		msg = msg?.replaceAll('{user.mention}', message.author);
		msg = msg?.replaceAll('{user.nickname}', message.member.nickname);
		msg = msg?.replaceAll('{guild.name}', message.guild.name);
		msg = msg?.replaceAll('{guild.memberCount}', message.guild.members.cache.size.toLocaleString());
		msg = msg?.replaceAll('{message.channel}', message.channel.name);
		msg = msg?.replaceAll('{target.mention}', message.mentions.members.last() || message.member);
		msg = msg?.replaceAll('{target.tag}', message.mentions.members.last()?.user.tag || message.member?.user.tag);
		msg = msg?.replaceAll('{target.username}', message.mentions.members.last()?.user.username || message.member?.user.username);
		message.channel.send({ content: msg });

		if (!command) return;

		const errorEmbed = (msg) => message.client.makeEmbed({ description: msg, timestamp: message.createdAt });

		if (command.developer && !message.client.owners.includes(message.author.id)) {
			return message.channel.send({ embeds: [errorEmbed('Only the bot owners can execute this command!')] });
		}

		if (!message.client.owners.includes(message.author.id) && message.client.config.disabledCommands.includes(command.name)) {
			return message.channel.send({ embeds: [errorEmbed('Globally disabled command moment normies:')] });
		}

		if (command.botModerator && !message.client.botmoderators.includes(message.author.id)) {
			return message.channel.send({ embeds: [errorEmbed('Only the bot\'s bot moderators can execute this command!')] });
		}

		if (command.privateServer && message.guild.id !== process.env.TESTINGSERVER) {
			return message.channel.send({ embeds: [errorEmbed('This command can only be executed in the bot\'s native testing server!')] });
		}

		if (command.userPermissions && !message.member.permissions.any(command.userPermissions.map(perm => Permissions.FLAGS[perm.toUpperCase()]).filter(perm => perm !== undefined), { checkAdmin: true })) {
			return message.channel.send({ embeds: [errorEmbed(stripIndents`
            You are missing the required permissions to execute this command.
            Required Permissions: ${command.userPermissions.map(p => message.client.utils.formatPerm(p)).join(', ')}`,
			)] });
		}

		if (command.botPermissions && !message.guild.me.permissions.any(command.botPermissions.map(perm => Permissions.FLAGS[perm.toUpperCase()]).filter(perm => perm !== undefined), { checkAdmin: true })) {
			return message.channel.send({ embeds: [errorEmbed(stripIndents`
            I am missing the required permissions to execute this command.
            Required Permissions: ${command.botPermissions.map(p => message.client.utils.formatPerm(p)).join(', ')}`,
			)] });
		}

		if (command.args && !input.args.length) {
			return message.channel.send({ embeds: [errorEmbed(`You are missing an argument!\nUsage: ${message.client.user} ${command.name} ${command.usage}`)] });
		}

		if (command.guildPremium && !guild?.premium) {
			return message.channel.send({ embeds: [errorEmbed('This command can only be executed in premium servers.')] });
		}

		if (command.userPremium && !user?.premium) {
			return message.channel.send({ embeds: [errorEmbed('This command can only be executed by premium users.')] });
		}

		if (command.nsfw && !message.channel.nsfw) {
			return message.channel.send({ embeds: [errorEmbed('This command can only be executed in a NSFW channel.').setImage('https://images-ext-2.discordapp.net/external/hiWbEzhiEXfFaza5khoxg3mR3OWeugZwWo8vGxK8LzA/https/i.imgur.com/oe4iK5i.gif')] });
		}

		const { cooldowns } = message.client;
		if (!cooldowns.has(command.name)) {
			cooldowns.set(command.name, new Collection());
		}

		const now = Date.now();
		const timestamps = cooldowns.get(command.name);
		const cooldownAmount = (command.cooldown || 3) * 1000;
		const pcooldownAmount = (command.cooldown || 3) * 1000 / 2;
		const ocooldownAmount = (command.cooldown || 3) * 0;

		if (timestamps.has(message.author.id)) {
			if (message.client.owners.includes(message.author.id)) {
				timestamps.get(message.author.id) + ocooldownAmount;
			} else if (user?.premium) {
				const expirationTime = timestamps.get(message.author.id) + pcooldownAmount;
				if (now < expirationTime) {
					const timeLeft = message.client.utils.timeleft(expirationTime);
					return message.reply({ embeds: [errorEmbed(`${message.author} You are on premium cooldown!`).setFooter(timeLeft)] });
				}
			} else {
				const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
				if (now < expirationTime) {
					const timeLeft = message.client.utils.timeleft(expirationTime);
					return message.reply({ embeds: [errorEmbed(`${message.author} You are on cooldown!`).setFooter(timeLeft)] });
				}
			}
		}

		if (message.client.owners.includes(message.author.id)) {
			timestamps.set(message.author.id, now);
			setTimeout(() => timestamps.delete(message.author.id), ocooldownAmount);
		} else if (user?.premium) {
			timestamps.set(message.author.id, now);
			setTimeout(() => timestamps.delete(message.author.id), pcooldownAmount);
		} else {
			timestamps.set(message.author.id, now);
			setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
		}

		try {
			command.execute(message, input);

			console.log(`${message.author.tag} (\`${message.author.id}\`) ran ${command.name}.\nGuild: ${message.guild.name}(\`${message.guild.id}\`)\nTime: ${new Date()}\nContent: ${message.content}`);

			const chance = Math.floor(Math.random() * 10) + 1;

			if (chance >= 1 && chance <= 6) {
				const coinsGiven = Math.floor(Math.random() * 200) + 70;
				await message.client.db.addWallet(message.author.id, coinsGiven);
			}
		} catch (error) {
			console.error(`[Client] ${error}`);
			message.channel.send({ content:'Something went wrong while executing the command!' });
		}
	},
};