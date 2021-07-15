const { MessageAttachment } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
	name: 'captcha',
	description: 'Transform a user\'s avatar into a captcha image.',
	usage: '[user]',
	example: ['captcha @Hauntless#3212', 'captcha 270904126974590976'],
	botPermissions: ['EMBED_LINKS', 'SEND_MESSAGES', 'VIEW_CHANNEL', 'ATTACH_FILES'],
	cooldown: 10,
	async execute(message, { args }) {
		const { client } = message;
		const user = message.mentions.users.last() || await client.users.fetch(args[0]).catch(() => null) || message.author;
		const avatar = user.avatarURL({ format: 'png', dynamic: false, size: 1024 });
		const res = await fetch(encodeURI(`https://nekobot.xyz/api/imagegen?type=captcha&url=${avatar}&username=${user.tag}`));
		const vid = (await res.json()).message;
		const attachment = new MessageAttachment(vid, 'captcha.png');
		message.channel.send({ files: [attachment] });
	},
};