const fetch = require('node-fetch');
const { MessageAttachment } = require('discord.js');

module.exports = {
	name: 'deepfry',
	description: 'Deepfry a user\'s avatar.',
	usage: '[user]',
	example: ['deepfry @Hauntless#3212', 'deepfry @Dababy#0111'],
	botPermissions: ['EMBED_LINKS', 'SEND_MESSAGES', 'VIEW_CHANNEL', 'ATTACH_FILES'],
	cooldown: 5,
	async execute(message, { args }) {
		const { client } = message;
		const user = message.mentions.users.last() || await client.users.fetch(args[0]).catch(() => null) || message.author;
		const avatar = user.displayAvatarURL({ dynamic: false, size: 4096, format: 'png' });
		fetch('https://nekobot.xyz/api/imagegen?type=deepfry&image=' + avatar).then((res) => res.json()).then((data) => {
			const file = new MessageAttachment(data.message, 'deepfry.png');
			message.channel.send({ files: [file] });
		});
	},
};