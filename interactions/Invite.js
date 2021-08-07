const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
	name: 'invite',
	description: 'Replies with the bot invite.',
	async execute(interaction) {
		const embed = interaction.client.makeEmbed()
			.setTitle(interaction.client.user.username)
			.setURL(interaction.client.user.displayAvatarURL())
			.setThumbnail(interaction.client.user.displayAvatarURL({ dynamic: true, format: 'png' }))
			.setTimestamp()
			.setDescription(`We appreciate you for inviting ${interaction.client.user.username}! Thank you for supporting the bot development!\n\n**Click on the button to invite the bot!**`)
			.setFooter(`Total Servers: ${interaction.client.guilds.cache.size.toLocaleString()}`);

		await interaction.reply({ embeds: [embed], components: [new MessageActionRow().addComponents(new MessageButton().setURL(interaction.client.config.botinvite).setLabel('Invite me!').setStyle('LINK'))] });
	},
};