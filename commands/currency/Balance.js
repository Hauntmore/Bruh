const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'balance',
	aliases: ['bal'],
	description: 'Check a user\'s balance.',
	usage: '[member]',
	example: ['bal', 'balance @Hauntless#3212'],
	botPermissions: ['EMBED_LINKS', 'SEND_MESSAGES', 'VIEW_CHANNEL', 'READ_MESSAGE_HISTORY'],
	cooldown: 10,
	async execute(message, { args }) {
		const { client } = message;

		const user = message.mentions.users.last() || await client.users.fetch(args[0]).catch(() => null) || message.author;

		const currency = await client.db.getBalance(user.id);

		const totalBalance = currency.bank + currency.wallet;

		const embed = new MessageEmbed()
			.setTitle(`${user.username}'s Balance`)
			.setDescription(`**Wallet**: ${currency.wallet.toLocaleString()}\n**Bank**: ${currency.bank.toLocaleString()}\n**Total**: ${totalBalance.toLocaleString()}`)
			.setFooter('😏💰')
			.setTimestamp()
			.setColor('GREEN');

		message.channel.send({ embeds: [embed] });
	},
};