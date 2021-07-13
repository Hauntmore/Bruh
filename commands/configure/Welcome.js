module.exports = {
	name: 'welcome',
	description: 'Configure the guild welcome data.',
	usage: '<message=content|channel=channel>',
	example: ['welcome message delete', 'welcome message set Welcome {user.tag}', 'welcome channel set #welcomes', 'welcome channel delete'],
	botPermissions: ['EMBED_LINKS', 'SEND_MESSAGES', 'VIEW_CHANNEL', 'READ_MESSAGE_HISTORY'],
	userPermissions: ['MANAGE_GUILD'],
	args: true,
	execute(message, { args }) {
		const { client } = message;
		const errorEmbed = (msg) => client.makeEmbed({ description: msg, timestamp: message.createdAt });
		const content = args.slice(2).join(' ');
		const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[2]);

		if (!['message', 'channel'].includes(args[0].toLowerCase())) return message.channel.send({ embeds: [errorEmbed('Your parameter input is incorrect.')] });
		if (!['set', 'delete'].includes(args[1].toLowerCase())) return message.channel.send({ embeds: [errorEmbed('Your parameter input is incorrect.')] });

		if (args[0].toLowerCase() === 'message' && args[1].toLowerCase() === 'delete') {
			client.db.guildWelcomeMessage(message.guild.id, 'null');
			message.channel.send({ content: 'You have resetted the welcome message!' });
		} else if (args[0].toLowerCase() === 'message' && args[1].toLowerCase() === 'set') {
			if (!content) return message.reply({ embeds: [errorEmbed('You need to add a welcome message!')] });
			client.db.guildWelcomeMessage(message.guild.id, content);
			message.channel.send({ content: `You have set the guild welcome message to the following:\n\n${content}` });
		}

		if (args[0].toLowerCase() === 'channel' && args[1].toLowerCase() === 'delete') {
			client.db.guildWelcomeChannel(message.guild.id, 'null');
			message.channel.send({ content: 'You have resetted the welcome channel location!' });
		} else if (args[0].toLowerCase() === 'channel' && args[1].toLowerCase() === 'set') {
			if (!content) return message.reply({ embeds: [errorEmbed('You need to add a valid channel for the welcome channel.')] });
			client.db.guildWelcomeChannel(message.guild.id, channel.id);
			if (!channel) return message.reply({ embeds: [errorEmbed('This channel does not exist.')] });
			message.channel.send({ content: `You have set the guild welcome channel to ${channel.name}.` });
		}
	},
};