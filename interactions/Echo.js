const Discord = require('discord.js');

module.exports = {
	name: 'echo',
	description: 'Replies back with the inputed text.',
	options: [{
		name: 'input',
		type: 3,
		description: 'The text to reply back with.',
		required: true,
	}],
	async execute(interaction) {
		await interaction.reply({ content: `${Discord.Util.removeMentions(interaction.options.getString('input', true))}\n\n- **${interaction.user.tag}**` });
	},
};