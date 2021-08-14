const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'simprate',
	aliases: ['simpr8'],
	description: 'Determine a user\'s simp percentage.',
	usage: '[member]',
	example: ['simpr8 @Hauntless#3212', 'simpr8 749732650209640529', 'simpr8'],
	botPermissions: ['EMBED_LINKS', 'SEND_MESSAGES', 'VIEW_CHANNEL', 'READ_MESSAGE_HISTORY'],
	cooldown: 4,
	execute(message, { args }) {
		const member = message.mentions.members.last() || message.guild.members.cache.get(args[0]) || message.member;

		const embed = new MessageEmbed()
			.setAuthor(member.user.tag, member.user.displayAvatarURL({ dynamic: true, size: 512 }))
			.setDescription(`${member.user.tag} is ${Math.floor(Math.random() * 101)}% a simp.`)
			.setColor(0xE3BAF7)
			.setTitle('simp generator machine')
			.setFooter('simp = bad - pepe lord')
			.setURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
		message.reply({ embeds: [embed] });
	},
};