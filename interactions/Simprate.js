const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'simprate',
	description: 'Replies back with a member\'s simp rating.',
	options: [{
		name: 'member',
		type: 6,
		description: 'The member to fetch an avatar from.',
		required: false,
	}],
	async execute(interaction) {
		const member = interaction.options.getMember('member') || interaction.member;

		const embed = new MessageEmbed()
			.setAuthor(member.user.tag, member.user.displayAvatarURL({ dynamic: true, size: 512 }))
			.setDescription(`${member.user.tag} is ${Math.floor(Math.random() * 101)}% a simp.`)
			.setColor(0xE3BAF7)
			.setTitle('simp generator machine')
			.setFooter('simp = bad - pepe lord')
			.setURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ');

		await interaction.reply({ embeds: [embed] });
	},
};