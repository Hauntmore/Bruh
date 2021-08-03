module.exports = {
	name: 'deploy',
	description: 'Deploy application commands.',
	botPermissions: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'READ_MESSAGE_HISTORY'],
	developer: true,
	async execute(message) {
		const { client } = message;
		// Slash command data.
		const data = [
			{
				name: 'ping',
				description: 'Replies with the client\'s Discord API websocket ping and interaction latency.',
			},
			{
				name: 'uptime',
				description: 'Replies with the client\'s current uptime.',
			},
			{
				name: 'invite',
				description: 'Replies with the bot invite.',
			},
			{
				name: 'echo',
				description: 'Replies back with the inputed text.',
				options: [{
					name: 'input',
					type: 'STRING',
					description: 'The text to reply back with.',
					required: true,
				}],
			},
			{
				name: 'asktrump',
				description: 'Ask 45th United States president Donald Trump something!',
				options: [{
					name: 'input',
					type: 'STRING',
					description: 'The question to ask Donald Trump.',
					required: true,
				}],
			},
			{
				name: '8ball',
				description: 'Ask the magical 8ball something.',
				options: [{
					name: 'input',
					type: 'STRING',
					description: 'The question to ask the 8ball.',
					required: true,
				}],
			},
			{
				name: 'docs',
				description: 'Search the official Discord.js documentation.',
				options: [{
					name: 'input',
					type: 'STRING',
					description: 'The query to search for in the docs.',
					required: true,
				}],
			},
		];

		// Set the application commands; set to an empty array to delete all interaction commands.
		await client.application?.commands.set(data);

		message.channel.send({ content: 'The application commands are now deploying. Do note it does take approximately **one hour** to cache all global command interactions.' });
	},
};