const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'penis',
	aliases: ['dick', 'howbig', 'pp'],
	description: 'Get the penis size of a user.',
	usage: '[member]',
	example: ['penis @Polaris#0525', 'penis @Hauntless#3212'],
	botPermissions: ['EMBED_LINKS', 'SEND_MESSAGES', 'VIEW_CHANNEL', 'READ_MESSAGE_HISTORY'],
	cooldown: 3,
	execute(message, { args }) {
		const { client } = message;

		const member = message.mentions.members.last() || message.guild.members.cache.get(args[0]) || message.member;

		const random = Math.floor(Math.random() * 13);

		const embed = new MessageEmbed()
			.setAuthor(member.user.tag, member.user.displayAvatarURL({ dynamic: true, size: 512 }))
			.setDescription(`${member.user.tag}'s Penis: 8${'='.repeat(random)}D`)
			.setTitle('penis generator game machine')
			.setColor(0xD0DAF2)
			.setFooter(`my penis is way bigger anyways l0ser | ${client.user.username}`)
			.setURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
		message.reply({ embeds: [embed] });
	},
};