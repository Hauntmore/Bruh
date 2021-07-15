const { MessageAttachment } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
	name: 'clyde',
	description: 'Create a clyde image with the given text.',
	usage: '<text>',
	example: ['clyde I am so fat!', 'clyde I am a shitty bot!'],
	botPermissions: ['EMBED_LINKS', 'SEND_MESSAGES', 'VIEW_CHANNEL', 'ATTACH_FILES'],
	cooldown: 5,
	args: true,
	async execute(message, { args }) {
		const text = args.slice(0).join(' ');
		if (text.length >= 71) return message.channel.send('Please input text that is under 71 characters.').then(m => m.delete({ timeout: 5000 }));
		const json = await fetch(encodeURI(`https://nekobot.xyz/api/imagegen?type=clyde&text=${text}`)).then(res => res.json());
		const image = new MessageAttachment(json.message, 'clyde.png');
		message.channel.send({ files: [image] });
	},
};