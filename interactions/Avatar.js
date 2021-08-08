module.exports = {
	name: 'avatar',
	description: 'Replies back with a member\'s avatar.',
	options: [{
		name: 'member',
		type: 6,
		description: 'The member to fetch an avatar from.',
		required: false,
	}],
	async execute(interaction) {
		const member = interaction.options.getMember('member') || interaction.member;

		const embed = interaction.client.makeEmbed()
			.setTitle(member.user.tag + '\'s Avatar')
			.setImage(member.user.displayAvatarURL({ dynamic: true, size: 1024 }))
			.setDescription(`**Avatar as:**\n[png](${member.user.displayAvatarURL({ format : 'png' })}) | [gif](${member.user.displayAvatarURL({ format : 'gif' })}) | [jpg](${member.user.displayAvatarURL({ format : 'jpg' })}) | [webp](${member.user.displayAvatarURL({ format : 'webp' })})`);

		await interaction.reply({ embeds: [embed] });
	},
};