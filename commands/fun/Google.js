const Discord = require('discord.js');

module.exports = {
	name: 'google',
	description: 'Google something.',
	usage: '<text>',
	example: ['google Pineapple Juice', 'google how do i grow my dick'],
	botPermissions: ['EMBED_LINKS', 'SEND_MESSAGES', 'VIEW_CHANNEL', 'READ_MESSAGE_HISTORY'],
	cooldown: 10,
	args: true,
	execute(message, { args }) {
		message.channel.send({ content: `http://lmgtfy.com/?q=${Discord.Util.removeMentions(args.join('+'))}` });
	},
};