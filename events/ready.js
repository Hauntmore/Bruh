const mongoose = require('mongoose');
const { initialize } = require('../structures/Top-gg');

module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
		// Connect to the MongoDB database.
		await mongoose.connect(`mongodb+srv://${process.env.MONGODBUSER}:${process.env.MONGODBPASS}@${process.env.MONGODBNAME}.5urdg.mongodb.net/Data`, {
			keepAlive: true,
			useCreateIndex: true,
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
		});

		// Initiate the Lavalink manager.
		client.manager.init(client.user.id);

		// Initiate the Top.gg app server.
		initialize();

		mongoose.connection.on('error', (error) => console.log(`A mongoose error has occurred!\n${error}`));

		mongoose.connection.on('disconnected', () => console.log('The client has disconnected from the database.'));

		mongoose.connection.on('connected', () => console.log('The client has established a connection with the database.'));

		mongoose.connection.on('reconnect', () => console.log('The client has reconnected to the database.'));

		// Set the presence of the client.
		client.user.setPresence({ activities: [{ name: `${client.defaultPrefix} help`, type: 'PLAYING' }], status: 'online' });

		console.log(`Logged in as ${client.user.tag}.`);

		// Slash command data.
		const data = [
			{
				name: 'ping',
				description: 'Replies with the client\'s Discord API websocket ping and message latency.',
			},
			{
				name: 'uptime',
				description: 'Replies with the client\'s current uptime.',
			},
		];

		// Set to an empty array to delete all interaction commands.
		await client.application?.commands.set(data);
	},
};