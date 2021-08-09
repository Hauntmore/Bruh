module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
		// Set the presence of the client.
		client.user.setPresence({ activities: [{ name: `${client.defaultPrefix} help`, type: 'PLAYING' }], status: 'online' });

		console.log(`[Client] Logged in as ${client.user.tag}.`);
	},
};