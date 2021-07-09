const { MessageButton } = require('discord.js');

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
		if (isNaN(amount) === true || amount <= 0 || amount > 99) return message.reply({ embeds: [errorEmbed('You need to include an amount (1-99) to purge.')] });

		const messages = await message.channel.messages.fetch({ limit: amount + 1 });
		if (messages.size === 0) return message.reply({ embeds: [errorEmbed('I am unable to find any messages!')] });
		const confirm = new MessageButton()
			.setCustomId('1')
			.setLabel('Continue')
			.setEmoji('<a:hb_check:814637252759912478>')
			.setStyle('SUCCESS');

		const cancel = new MessageButton()
			.setCustomId('2')
			.setLabel('Cancel')
			.setEmoji('<a:hb_cross:823305093452529674>')
			.setStyle('DANGER');

		const filter = interaction => (interaction.customId === '1' || interaction.customId === '2') && interaction.user.id === message.author.id;

		const confirmation = await message.channel.send({ content: `Are you sure you would like to bulk delete ${amount} messages in this channel?`, components: [[cancel, confirm]] });
		confirmation.awaitMessageComponent({ filter, time: 10000 })
			.then(async (interaction) => {
				if (interaction.customId === '1') {
					const msgs = await message.channel.bulkDelete(messages, { filterOld: true }).catch(error => console.log(error));
					confirmation.edit({ content: `${message.author}, You have bulk deleted ${msgs.size - 1} messages in this channel!`, components: [] });
					client.setTimeout(() => confirmation.delete(), 5000);
				} else if (interaction.customId === '2') {
					confirmation.edit({ content: 'You have canceled this action.', components: [] });
				}
			})
			.catch(() => {
				confirmation.edit({ content: 'This action has timed out.', components: [] });
			});
	},
};