const { MessageAttachment } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
	name: 'gay',
	description: 'Merge a user\'s avatar with the pride flag.',
	usage: '[user]',
	example: ['gay @Hauntless#3212', 'gay 270904126974590976'],
	botPermissions: ['EMBED_LINKS', 'SEND_MESSAGES', 'VIEW_CHANNEL', 'ATTACH_FILES'],
	cooldown: 10,
	async execute(message, { args }) {
		const { client } = message;
		const user = message.mentions.users.last() || await client.users.fetch(args[0]).catch(() => null) || message.author;
		const buffer = await (await fetch('https://api.monkedev.com/canvas/gay?imgUrl=' + encodeURIComponent(user.displayAvatarURL({ size: 1024, format: 'jpg' })))).buffer();
		const attachment = new MessageAttachment(buffer, 'gay.jpg');
		message.channel.send({ files: [attachment] });
	},
};