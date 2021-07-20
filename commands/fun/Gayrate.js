const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'gayrate',
	aliases: ['gayr8', 'howgay'],
	description: 'Determine a user\'s gay percentage.',
	usage: '[member]',
	example: ['gayrate @Hauntless#3212', 'gayr8 749732650209640529', 'howgay'],
	botPermissions: ['EMBED_LINKS', 'SEND_MESSAGES', 'VIEW_CHANNEL', 'READ_MESSAGE_HISTORY'],
	cooldown: 3,
	execute(message, { args }) {
		const member = message.mentions.members.last() || message.guild.members.cache.get(args[0]) || message.member;

		const embed = new MessageEmbed()
			.setAuthor(member.user.tag, member.user.displayAvatarURL({ dynamic: true, size: 512 }))
			.setDescription(`${member.user.tag} is ${Math.floor(Math.random() * 101)}% gay.`)
			.setColor(0xE3BAF7)
			.setTitle('gayrate generator machine')
			.setFooter('🏳️‍🌈 | stonks gayness')
			.setURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
		message.reply({ embeds: [embed] });
	},
};