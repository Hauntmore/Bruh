const Discord = require('discord.js');

module.exports = {
	name: 'clap',
	description: 'Clap something',
	options: [{
		name: 'text',
		type: 3,
		description: 'The text to clap',
		required: true,
	}],
	async execute(interaction) {
		const { client } = interaction;

		const errorEmbed = (msg) => client.makeEmbed({ description: msg, timestamp: interaction.createdAt });

		const clap = interaction.options.getString('text', true).split(' ').join(' :clap: ');

		if (clap.length < 1) return await interaction.reply({ embeds: [errorEmbed('Please input text.')] });
		if (clap.length > 600) return await interaction.reply({ embeds: [errorEmbed('Please keep the text below 600 Characters.')] });

		await interaction.reply({ content: `:clap: ${Discord.Util.removeMentions(clap)} :clap:` });
	},
};