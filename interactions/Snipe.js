module.exports = {
	name: 'snipe',
	description: 'N/A',
	async execute(interaction) {
		await interaction.reply({ content: 'Snipe commands are widely considered a violation of user privacy. If a message is deleted it should stay that way.\n• Logs for moderation purposes are fine.\n• Bringing back a deleted message by just anyone to expose or humiliate a user is not.' });
	},
};