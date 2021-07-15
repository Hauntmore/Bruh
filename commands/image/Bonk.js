const { MessageEmbed, MessageAttachment } = require('discord.js');
const jimp = require('jimp');

module.exports = {
	name: 'bonk',
	description: 'Bonk a user.',
	usage: '<user>',
	example: ['bonk @Hauntless#3212', 'bonk 270904126974590976'],
	botPermissions: ['EMBED_LINKS', 'SEND_MESSAGES', 'VIEW_CHANNEL', 'ATTACH_FILES'],
	args: true,
	cooldown: 10,
	async execute(message, { args }) {
		const { client } = message;
		const user = message.mentions.users.last() || await client.users.fetch(args[0]).catch(() => null);
		if (!user) return message.reply('I cannot fetch that user.');
		const bonk = await jimp.read(`${__dirname}/../../lib/assets/hornyjail.jpeg`);
		const authorAvatar = await jimp.read(message.author.displayAvatarURL({ format: 'jpeg' }));
		const userToBonk = await jimp.read(user.displayAvatarURL({ format: 'jpeg' }));
		authorAvatar.circle();
		userToBonk.circle();
		bonk.resize(1000, 500);
		authorAvatar.resize(220, 220);
		userToBonk.resize(200, 200);
		bonk.composite(authorAvatar, 200, 50);
		bonk.composite(userToBonk, 650, 300);
		bonk.getBuffer('image/jpeg', (error, buffer) => {
			if (error) throw error;
			const bonkedAttachment = new MessageAttachment(buffer, 'hornyjail.jpeg');
			const embed = new MessageEmbed()
				.setColor('#e67b41')
				.setTitle(`${user.tag} Just Got Bonked!`)
				.setImage('attachment://hornyjail.jpeg');
			message.channel.send({ embeds: [embed], files: [bonkedAttachment] });
		});
	},
};