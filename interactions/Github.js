const { MessageButton, MessageActionRow } = require('discord.js');

module.exports = {
	name: 'github',
	description: 'View the source code of the bot.',
	async execute(interaction) {
		const { client } = interaction;

		const embed = client.makeEmbed()
			.setTitle(client.user.username)
			.setURL(client.user.displayAvatarURL())
			.setThumbnail(client.user.displayAvatarURL({ dynamic: true, format: 'png' }))
			.setTimestamp()
			.setDescription(`Click here to view the bot's source. ${client.utils.link('GitHub', client.config.botgithub)}`)
			.setFooter(`Total Servers: ${client.guilds.cache.size.toLocaleString()}`);

		await interaction.reply({ embeds: [embed], components: [new MessageActionRow().addComponents(new MessageButton().setURL(client.config.botgithub).setLabel('GitHub Repository!').setStyle('LINK'))] });
	},
};