module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
		console.log(`[Client] Logged in as ${client.user.tag}.`);
	},
};