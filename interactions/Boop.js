module.exports = {
	name: 'boop',
	description: 'Boop!',
	async execute(interaction) {
		await interaction.reply({ content: 'Boop!' });
	},
};