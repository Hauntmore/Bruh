module.exports = {
	name: 'ping',
	aliases: ['latency'],
	description: 'Get the Discord API Websocket ping and the message latency.',
	botPermissions: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY'],
	execute(message) {
		const { client } = message;
		message.channel.send({ content: `*Trust me, these numbers don't mean anything*.\n\n**Discord API Websocket Ping**: \`${client.ws.ping}ms\`.\n**Message Latency**: \`${Date.now() - message.createdTimestamp}ms\`.` });
	},
};