const { trumpPhotos, trumpResponses } = require('../lib/json/trump.json');

module.exports = {
	name: 'asktrump',
	description: 'Ask 45th United States president Donald Trump something!',
	options: [{
		name: 'input',
		type: 3,
		description: 'The question to ask Donald Trump.',
		required: true,
	}],
	async execute(interaction) {
		const embed = interaction.client.makeEmbed()
			.setDescription(`\n${interaction.user.username}: ${interaction.options.getString('input', true)}\n\nDonald Trump: ${trumpResponses[Math.floor(Math.random() * trumpResponses.length)].toUpperCase()}`)
			.setThumbnail(trumpPhotos[Math.floor(Math.random() * trumpPhotos.length)])
			.setTimestamp();

		await interaction.reply({ embeds: [embed] });
	},
};