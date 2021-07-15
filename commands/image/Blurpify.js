const fetch = require('node-fetch');
const { MessageAttachment } = require('discord.js');

module.exports = {
	name: 'blurpify',
	description: 'Blurpify a user\'s avatar.',
	usage: '[user]',
	example: ['blurpify @Hauntless#3212', 'blurpify 679867543066116169'],
	botPermissions: ['EMBED_LINKS', 'SEND_MESSAGES', 'VIEW_CHANNEL', 'ATTACH_FILES'],
	cooldown: 10,
	async execute(message, { args }) {
		const { client } = message;
		const user = message.mentions.users.last() || await client.users.fetch(args[0]).catch(() => null) || message.author;
		const files = user.displayAvatarURL({ dynamic: false, size: 4096 });
		const json = await fetch(encodeURI(`https://nekobot.xyz/api/imagegen?type=blurpify&image=${files}`)).then(res => res.json());
		const file = new MessageAttachment(json.message, 'blurpify.png');
		message.channel.send({ files: [file] });
	},
};