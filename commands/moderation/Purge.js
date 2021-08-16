module.exports = {
	name: 'purge',
	aliases: ['clear'],
	description: 'Purge some messages.',
	usage: '<amount>',
	example: ['purge 10', 'clear 50'],
	botPermissions: ['EMBED_LINKS', 'SEND_MESSAGES', 'VIEW_CHANNEL', 'MANAGE_MESSAGES', 'READ_MESSAGE_HISTORY'],
	userPermissions: ['MANAGE_MESSAGES'],
	args: true,
	async execute(message, { args }) {
		const { client } = message;

		const errorEmbed = (msg) => client.makeEmbed({ description: msg, timestamp: message.createdAt });

		const amount = parseInt(args[0]);

		if (isNaN(amount) || amount <= 0 || amount > 99) return message.reply({ embeds: [errorEmbed('You need to include an amount (1-99) to purge.')] });

		const messages = await message.channel.messages.fetch({ limit: amount + 1 });
		if (!messages.size) return message.reply({ embeds: [errorEmbed('I am unable to find any messages!')] });

		const msgs = await message.channel.bulkDelete(messages, { filterOld: true }).catch(error => console.log(error));
		const msg = await message.channel.send({ content: `${message.author}, You have bulk deleted a total of ${msgs.size} messages (including the command message) in this channel!` });

		setTimeout(() => msg.delete(), 5000);
	},
};