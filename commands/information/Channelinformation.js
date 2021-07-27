const channelType = {
	GUILD_TEXT: 'text',
	GUILD_VOICE: 'voice',
	GUILD_CATEGORY: 'category',
	GUILD_NEWS: 'news',
	GUILD_STORE: 'store',
	GUILD_NEWS_THREAD: 'news Thread',
	GUILD_PUBLIC_THREAD: 'public Thread',
	GUILD_PRIVATE_THREAD: 'private Thread',
	GUILD_STAGE_VOICE: 'stage',
	UNKNOWN: 'unknown',
	DM: 'dM',
	GROUP_DM: 'group DM',
};

module.exports = {
	name: 'channelinformation',
	aliases: ['channelinfo', 'ci'],
	description: 'Send information about a channel.',
	usage: '[channel]',
	example: ['channelinformation #general', 'channelinfo 790783208777580575', 'ci general'],
	botPermissions: ['SEND_MESSAGES', 'EMBED_LINKS', 'VIEW_CHANNEL'],
	cooldown: 2,
	execute(message, { args }) {
		const { client } = message;
		const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.guild.channels.cache.find((r) => r.name.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.channel;
		const embed = client.makeEmbed()
			.setTitle(`Channel Information for ${channel.name}`)
			.addField('**❯ Created at -**', `${channel.createdAt.toUTCString().substr(0, 16)}`, false)
			.addField('**❯ Type -**', `${client.utils.capitalize(channelType[channel.type])} Channel`, false)
			.addField('**❯ Topic -**', `${channel.topic ? channel.topic : 'No channel topic.'}`, false)
			.setFooter(`ID: ${channel.id}`);
		message.channel.send({ embeds: [embed] });
	},
};