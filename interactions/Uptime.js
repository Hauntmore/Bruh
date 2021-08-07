module.exports = {
	name: 'uptime',
	description: 'Replies with the client\'s current uptime.',
	async execute(interaction) {
		await interaction.reply({ content: `**Uptime**: \`${interaction.client.utils.parseTime(Math.round(interaction.client.uptime / 1000))}\`.` });
	},
};