module.exports = {
	name: 'ping',
	description: 'Replies with the client\'s Discord API websocket ping and interaction latency.',
	async execute(interaction) {
		await interaction.reply({ content: `**Discord API Websocket Ping**: \`${Math.round(interaction.client.ws.ping)}ms\`.\n**Interaction Latency**: \`${Date.now() - interaction.createdTimestamp}ms\`.` });
	},
};