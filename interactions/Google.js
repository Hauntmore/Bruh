const Discord = require('discord.js');

module.exports = {
	name: 'google',
	description: 'Google something',
	options: [{
		name: 'query',
		type: 3,
		description: 'The query to search.',
		required: true,
	}],
	async execute(interaction) {
		await interaction.reply({ content: `http://lmgtfy.com/?q=${Discord.Util.removeMentions(interaction.options.getString('query', true).join('+'))}` });
	},
};