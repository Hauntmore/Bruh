const mongoose = require('mongoose');

module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
		await mongoose.connect(`mongodb+srv://${process.env.MONGODBUSER}:${process.env.MONGODBPASS}@${process.env.MONGODBNAME}.5urdg.mongodb.net/Data`, {
			keepAlive: true,
			useCreateIndex: true,
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
		});

		client.manager.init(client.user.id);

		mongoose.connection.on('error', (error) => console.log(`A mongoose error has occurred!\n${error}`));

		mongoose.connection.on('disconnected', () => console.log('The client has disconnected from the database.'));

		mongoose.connection.on('connected', () => console.log('The client has established a connection with the database.'));

		mongoose.connection.on('reconnect', () => console.log('The client has reconnected to the database.'));

		client.user.setPresence({ activities: [{ name: `${client.defaultPrefix} help`, type: 'PLAYING' }], status: 'online' });

		console.log(`Logged in as ${client.user.tag}.`);

		const data = [
			{
				name: 'ping',
				description: 'Replies with the client websocket ping.',
			},
			{
				name: 'uptime',
				description: 'Replies with the client\'s current uptime.',
			},
		];

		const commands = await client.application?.commands.set(data);
		// Set to an empty array to delete all interaction commands.

		console.log(commands);
	},
};