const { MessageButton, MessageActionRow } = require('discord.js');

module.exports = {
	name: 'vote',
	description: 'Vote for the bot! :)',
	async execute(interaction) {
		const embed = interaction.client.makeEmbed()
			.setTitle(interaction.client.user.username)
			.setURL(interaction.client.user.displayAvatarURL({ format: 'png' }))
			.setThumbnail(interaction.client.user.displayAvatarURL({ dynamic: true, format: 'png' }))
			.setTimestamp()
			.setDescription(`Click here to be redirected to the top.gg website to vote for the bot. ${interaction.client.utils.link('Top.gg/Bruh-Bot', interaction.client.config.botvote)}`)
			.setFooter(`Total Servers: ${interaction.client.guilds.cache.size.toLocaleString()}`);

		await interaction.reply({ embeds: [embed], components: [new MessageActionRow().addComponents(new MessageButton().setURL(interaction.client.config.botvote).setLabel('Vote for me!').setStyle('LINK'))] });
	},
};