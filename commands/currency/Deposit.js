module.exports = {
	name: 'deposit',
	aliases: ['dep'],
	description: 'Deposit an amount of coins.',
	usage: '<amount>',
	example: ['dep 4385', 'deposit 100', 'dep max', 'deposit half'],
	botPermissions: ['EMBED_LINKS', 'SEND_MESSAGES', 'VIEW_CHANNEL', 'READ_MESSAGE_HISTORY'],
	cooldown: 7,
	args: true,
	async execute(message, { args }) {
		const { client } = message;

		const errorEmbed = (msg) => client.makeEmbed({ description: msg, timestamp: message.createdAt });
		const currency = await client.db.getBalance(message.author.id);

		const amount = parseFloat(args[0]);

		if (args[0].toLowerCase() === 'max' && isNaN(amount)) {
			await client.db.removeWallet(message.author.id, Math.round(currency.wallet));

			await client.db.addBank(message.author.id, Math.round(currency.wallet));

			message.channel.send({ content: `You have deposited ${Math.round(currency.wallet).toLocaleString()} coins.` });

		} else if (args[0].toLowerCase() === 'half' && isNaN(amount)) {
			await client.db.removeWallet(message.author.id, Math.round(currency.wallet / 2));

			await client.db.addBank(message.author.id, Math.round(currency.wallet / 2));

			message.channel.send({ content: `You have deposited ${Math.round(currency.wallet / 2).toLocaleString()} coins.` });

		} else if (isNaN(amount) || amount <= 0) {
			return message.reply({ embeds: [errorEmbed('You have not given me a valid amount.')] });
		} else if (!isNaN(amount)) {
			await client.db.addBank(message.author.id, Math.round(amount));

			await client.db.removeWallet(message.author.id, Math.round(amount));

			message.channel.send({ content: `You have deposited ${Math.round(amount).toLocaleString()} coins.` });
		}
	},
};