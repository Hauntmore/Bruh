module.exports = {
	name: 'firstmessage',
	aliases: ['firstmsg'],
	description: 'View the first message in a channel.',
	usage: '[channel]',
	example: ['firstmsg', 'firstmessage #general-chat'],
	botPermissions: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'EMBED_LINKS', 'READ_MESSAGE_HISTORY'],
	userPermissions: ['MANAGE_MESSAGES'],
	async execute(message, { args }) {
		const { client } = message;

		const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.guild.channels.cache.find((r) => r.name.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.channel;
		const fetchMessages = await channel.messages.fetch({ after: 1, limit: 1 });

		const msg = fetchMessages.first();

		message.channel.send({ embeds: [client.makeEmbed()
			.setTitle(`The first messsage in ${msg.channel.name}`)
			.setURL(msg.url)
			.setTimestamp()
			.setThumbnail(msg.author.displayAvatarURL({ dynamic: true }))
			.setDescription(`Content: ${msg.content}`)
			.addField('**❯ Author -**', `${msg.author}`, true)
			.addField('**❯ Message ID -**', `${msg.id}`, true)
			.addField('**❯ Message created at -**', `${msg.createdAt.toLocaleDateString()}`, true),
		] });
	},
};