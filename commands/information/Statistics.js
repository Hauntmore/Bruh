const { version: djsversion } = require('discord.js');

module.exports = {
	name: 'statistics',
	aliases: ['stats', 'stat', 'botinfo', 'botinformation'],
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
                `**Emotes**: ${client.emojis.cache.size.toLocaleString()}\n` +
                `**Guilds**: ${client.guilds.cache.size.toLocaleString()}\n` +
                `**Users**: ${client.users.cache.size.toLocaleString()}\n`,
					inline: false,
				},
				{
					name: 'Data',
					value:
                `**Uptime**: ${client.utils.parseTime(Math.round(client.uptime / 1000),
                )}\n` +
                `**Discord API Websocket Ping**: ${Math.round(client.ws.ping)}ms\n` +
				`**Message Latency**: ${Date.now() - message.createdTimestamp}ms\n` +
				`**RAM**: ${client.utils.formatBytes(process.memoryUsage().heapUsed)}\n`,
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