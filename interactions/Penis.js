const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'penis',
	description: 'Replies back with a member\'s penis size.',
	options: [{
		name: 'member',
		type: 6,
		description: 'The member to fetch a penis size from.',
		required: false,
	}],
	async execute(interaction) {
		const member = interaction.options.getMember('member') || interaction.member;

		const random = Math.floor(Math.random() * 13);

		const embed = new MessageEmbed()
			.setAuthor(member.user.tag, member.user.displayAvatarURL({ dynamic: true, size: 512 }))
			.setDescription(`${member.user.tag}'s Penis: 8${'='.repeat(random)}D`)
			.setTitle('penis generator game machine')
			.setColor(0xD0DAF2)
			.setFooter(`my penis is way bigger anyways l0ser | ${interaction.client.user.username}`)
			.setURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ');

		await interaction.reply({ embeds: [embed] });
	},
};