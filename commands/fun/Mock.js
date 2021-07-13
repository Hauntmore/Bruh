module.exports = {
	name: 'mock',
	description: 'Do some mocking. (Code found and modified from [Dank Memer v5 Source Code](https://dankmemer.lol/source).',
	usage: '<text>',
	example: ['mock pls give me free robux', 'pls mock i play fortnite'],
	botPermissions: ['EMBED_LINKS', 'SEND_MESSAGES', 'VIEW_CHANNEL', 'READ_MESSAGE_HISTORY'],
	args: true,
	cooldown: 3,
	execute(message, { args }) {
		message.channel.send({ content: args.slice(0)
			.join(' ')
			.replace(/c/gi, 'k')
			.replace(/v/gi, 'c')
			.split('')
			.map((c, i) => i % 2 ? c.toUpperCase() : c)
			.join(''),
		});
	},
};