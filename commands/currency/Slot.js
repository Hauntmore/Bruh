module.exports = {
	name: 'slot',
	aliases: ['slotmachine', 'slots'],
	description: 'Gamble some coins with the slot machine.',
	usage: '<amount>',
	example: ['slot 4385', 'slotmachine 100'],
	botPermissions: ['EMBED_LINKS', 'SEND_MESSAGES', 'VIEW_CHANNEL', 'READ_MESSAGE_HISTORY'],
	cooldown: 30,
	async execute(message, { args }) {
		const { client } = message;

		const slots = ['<:h_KEKW:858770751942557717>', '<:h_kek:817569009246404638>', '<:h_mmLol:862736738136096788>'];

		const errorEmbed = (msg) => client.makeEmbed({ description: msg, timestamp: message.createdAt });

		const amount = parseInt(args[0]);

		if (isNaN(amount)) return message.reply({ embeds: [errorEmbed('That is not a number!')] });

		const slotOne = slots[Math.floor(Math.random() * slots.length)];
		const slotTwo = slots[Math.floor(Math.random() * slots.length)];
		const slotThree = slots[Math.floor(Math.random() * slots.length)];

		if (slotOne === slotTwo && slotOne === slotThree) {
			message.channel.send(`**>** ${slotOne} | ${slotTwo} | ${slotThree} **<**\n'Yay!'`);
			client.db.addWallet(message.author.id, amount * 2);
		} else {
			message.channel.send(`**>** ${slotOne} | ${slotTwo} | ${slotThree} **<**\n'You lost.'`);
			client.db.removeWallet(message.author.id, amount);
		}
	},
};