const { version: djsversion } = require('discord.js');

module.exports = {
	name: 'statistics',
	aliases: ['stats', 'stat'],
	description: 'View some basic bot statistics.',
	botPermissions: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'EMBED_LINKS', 'READ_MESSAGE_HISTORY'],
	execute(message) {
		const { client } = message;

		const embed = {
			fields: [
				{
					name: 'Cache',
					value:
                `**Channels**: ${client.channels.cache.size.toLocaleString()
                }\n` +
                `**Emotes**: ${client.emojis.cache.size}\n` +
                `**Guilds**: ${client.guilds.cache.size.toLocaleString()}\n` +
                `**Users**: ${client.users.cache.size.toLocaleString()}\n`,
					inline: false,
				},
				{
					name: 'Latency',
					value:
                `**Uptime**: ${client.utils.parseTime(Math.round(client.uptime / 1000),
                )}\n` +
                `**Ping**: ${Math.round(client.ws.ping)}ms\n`,
				},
			],
			color: 0x009874,
			title: 'Bot Statistics',
			footer: {
				text: `Bot Commands: ${client.commands.size.toLocaleString()} | Discord.js version: ${djsversion}`,
			},
			thumbnail: {
				url: client.user.displayAvatarURL({ dynamic: true, size: 1024 }),
			},
		};

		message.channel.send({ embeds: [embed] });
	},
};