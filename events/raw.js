module.exports = {
	name: 'raw',
	async execute(d, client) {
		// Update the Lavalink manager voice status.
		await client.manager?.updateVoiceState(d);
	},
};