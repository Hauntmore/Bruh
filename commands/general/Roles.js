const { MessageButton, MessageActionRow } = require('discord.js');

module.exports = {
	name: 'roles',
	async execute(message) {
		const { spydankers } = message.client.config;

		if (message.guild.id !== spydankers) return;

		const button1 = new MessageButton()
			.setStyle('SECONDARY')
			.setLabel('Events and Raffles')
			.setEmoji('<a:eventsping:872176693480132668>')
			.setCustomId('SpydRaffle');

		const button2 = new MessageButton()
			.setStyle('SECONDARY')
			.setLabel('Bro Player')
			.setEmoji('<:brobot:872179580444749865>')
			.setCustomId('SpydBroBot');

		// Karuta

		const button3 = new MessageButton()
			.setStyle('SECONDARY')
			.setLabel('Karuta Player')
			.setEmoji('<:Spy_karutaOwO:883185822478774303>')
			.setCustomId('SpydKarutaPlayer');

		const button4 = new MessageButton()
			.setStyle('SECONDARY')
			.setLabel('Partnership Ping')
			.setEmoji('<a:PartnerShine:872172947257835590>')
			.setCustomId('SpydPartner');

		const button5 = new MessageButton()
			.setStyle('SECONDARY')
			.setLabel('Giveaways')
			.setEmoji('<a:paisaaa:872175595470094346>')
			.setCustomId('SpydGiveaway');

		const button6 = new MessageButton()
			.setStyle('SECONDARY')
			.setLabel('Heists')
			.setEmoji('<:moneyheist:872174944023367691>')
			.setCustomId('SpydHeist');

		const button7 = new MessageButton()
			.setStyle('SECONDARY')
			.setLabel('Outside Heists')
			.setEmoji('<a:heists:872176990822752329>')
			.setCustomId('SpydOutsideHeist');

		const button8 = new MessageButton()
			.setStyle('SECONDARY')
			.setLabel('Flash Giveaways')
			.setEmoji('<a:moneygaw1:872176277824622713>')
			.setCustomId('SpydFlashGiveaway');

		const row = new MessageActionRow()
			.addComponents(button1, button2, button3, button4);

		const row2 = new MessageActionRow()
			.addComponents(button5, button6, button7, button8);

		message.channel.send({ content: `${message.guild.name}'s Self Roles`, components: [row, row2] });
	},
};