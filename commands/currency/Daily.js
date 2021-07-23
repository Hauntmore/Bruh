module.exports = {
	name: 'daily',
	aliases: ['24h', '24hr'],
	description: 'Claim your daily amount of coins.',
	botPermissions: ['EMBED_LINKS', 'SEND_MESSAGES', 'VIEW_CHANNEL', 'READ_MESSAGE_HISTORY'],
	cooldown: 86400,
	async execute(message) {
		const { client } = message;

		const coinsGiven = Math.floor(Math.random() * 10000) + 100;

		await client.db.addWallet(message.author.id, coinsGiven);

		message.channel.send({ content: `You have claimed your daily reward of ${coinsGiven}.` });
	},
};