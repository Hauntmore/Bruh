module.exports = {
	name: 'withdraw',
	aliases: ['with'],
	description: 'Withdraw an amount of coins.',
	usage: '<amount>',
	example: ['with 4385', 'withdraw 100', 'withdraw half', 'withdraw max'],
	botPermissions: ['EMBED_LINKS', 'SEND_MESSAGES', 'VIEW_CHANNEL', 'READ_MESSAGE_HISTORY'],
	cooldown: 7,
	args: true,
	async execute(message, { args }) {
		const { client } = message;

		const errorEmbed = (msg) => client.makeEmbed({ description: msg, timestamp: message.createdAt });
		const currency = await client.db.getBalance(message.author.id);

		const amount = parseFloat(args[0]);

		if (amount > currency.bank) return message.reply({ embeds: [errorEmbed('You cannot withdraw an amount of which you don\'t own loser.')] });

		if (args[0].toLowerCase() === 'max' && isNaN(amount)) {
			await client.db.addWallet(message.author.id, Math.round(currency.bank));

			await client.db.removeBank(message.author.id, Math.round(currency.bank));

			message.channel.send({ content: `You have withdrawn ${Math.round(currency.bank).toLocaleString()} coins.` });
		} else if (args[0].toLowerCase() === 'half' && isNaN(amount)) {
			await client.db.addWallet(message.author.id, Math.round(currency.bank / 2));

			await client.db.removeBank(message.author.id, Math.round(currency.bank / 2));

			message.channel.send({ content: `You have withdrawn ${Math.round(currency.bank / 2).toLocaleString()} coins.` });
		} else if (isNaN(amount) || amount <= 0) {
			return message.reply({ embeds: [errorEmbed('You have not given me a valid amount.')] });
		} else if (!isNaN(amount)) {
			await client.db.removeBank(message.author.id, Math.round(amount));

			await client.db.addWallet(message.author.id, Math.round(amount));

			message.channel.send({ content: `You have withdrawn ${Math.round(amount).toLocaleString()} coins.` });
		}
	},
};