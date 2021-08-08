const Discord = require('discord.js');

module.exports = {
	name: 'mock',
	description: 'Do some mocking. The code is modified from [Dank Memer v5 Source Code](https://dankmemer.lol/source).',
	options: [{
		name: 'text',
		type: 3,
		description: 'The thing to mock.',
		required: true,
	}],
	async execute(interaction) {
		await interaction.reply({ content: { content: Discord.Util.removeMentions(interaction.options.getString('text', true).replace(/c/gi, 'k').replace(/v/gi, 'c').split('').map((c, i) => i % 2 ? c.toUpperCase() : c).join('')) } });
	},
};