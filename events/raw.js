module.exports = {
	name: 'raw',
	async execute(d, client) {
		await client.manager?.updateVoiceState(d);
	},
};