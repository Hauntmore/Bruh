const Discord = require('discord.js');

module.exports = {
	name: 'mock',
	description: 'Do some mocking. (Code found and modified from [Dank Memer v5 Source Code](https://dankmemer.lol/source).',
	usage: '<text>',
	example: ['mock pls give me free robux', 'pls mock i play fortnite'],
	botPermissions: ['EMBED_LINKS', 'SEND_MESSAGES', 'VIEW_CHANNEL', 'READ_MESSAGE_HISTORY'],
	args: true,
	cooldown: 3,
	execute(message, { args }) {
		const { client } = message;

		const errorEmbed = (msg) => client.makeEmbed({ description: msg, timestamp: message.createdAt });

		if (message.mentions.members.first()) return message.reply({ embeds: [errorEmbed('NO NO, You cannot mention someone while doing this command.')] });

		message.channel.send({ content: Discord.Util.removeMentions(args.slice(0).join(' ').replace(/c/gi, 'k').replace(/v/gi, 'c').split('').map((c, i) => i % 2 ? c.toUpperCase() : c).join('')) });
	},
};