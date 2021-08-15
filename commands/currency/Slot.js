const slots = ['<:h_KEKW:858770751942557717>', '<:h_kek:817569009246404638>', '<:h_mmLol:862736738136096788>', ':grapes:', ':watermelon:', ':apple:', ':strawberry:'];

module.exports = {
	name: 'slot',
	aliases: ['slotmachine', 'slots'],
	description: 'Gamble some coins with the slot machine.',
	usage: '<amount>',
	example: ['slot 4385', 'slotmachine 100'],
	botPermissions: ['EMBED_LINKS', 'SEND_MESSAGES', 'VIEW_CHANNEL', 'READ_MESSAGE_HISTORY'],
	cooldown: 50,
	args: true,
	async execute(message, { args }) {
		const { client } = message;

		const errorEmbed = (msg) => client.makeEmbed({ description: msg, timestamp: message.createdAt });

		const currency = await client.db.getBalance(message.author.id);

		let amount = parseInt(args[0]);

		let win = false;

		const number = [];

		if (isNaN(amount) || amount > currency.wallet || amount > 1000000 || amount < 100) return message.reply({ embeds: [errorEmbed('The value you have given me is super bad. Try again noob.')] });

		// eslint-disable-next-line no-undef
		for (i = 0; i < 3; i++) { number[i] = Math.floor(Math.random() * slots.length); }

		if (number[0] == number[1] && number[1] == number[2]) {
			amount *= 9;
			win = true;
		} else if (number[0] == number[1] || number[0] == number[2] || number[1] == number[2]) {
			amount *= 2;
			win = true;
		}

		if (win) {
			const embed = client.makeEmbed()
				.setTitle(`${message.author.tag}'s Slot Machine`)
				.setDescription(`${slots[number[0]]} | ${slots[number[1]]} | ${slots[number[2]]}\n\nYou won **${amount}** coins`)
				.setFooter('YoU hAcKeR!');

			message.channel.send({ embeds: [embed] });
			await client.db.addWallet(message.author.id, amount);
		} else {
			const embeds = client.makeEmbed()
				.setTitle(`${message.author.tag}'s Slot Machine`)
				.setDescription(`${slots[number[0]]} | ${slots[number[1]]} | ${slots[number[2]]}\n\nYou lost **${amount}** coins`)
				.setFooter('You suck!');

			message.reply({ embeds: [embeds] });
			await client.db.removeWallet(message.author.id, amount);
		}
	},
};