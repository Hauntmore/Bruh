/* eslint-disable no-multiple-empty-lines */
module.exports = {
	name: 'test',
	description: 'Test Button Interactions.',
	botPermissions: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'EMBED_LINKS', 'READ_MESSAGE_HISTORY'],
	developer: true,
	async execute(message, { args }) {
		// Always the testing
		const { MessageButton, MessageActionRow } = require('discord.js');

		const MaleRole = new MessageButton()
			.setCustomId('SpydMale')
			.setStyle('SECONDARY')
			.setEmoji('<:spy_male_OwO:872170611718365224>')
			.setLabel('Male');

		const FemaleRole = new MessageButton()
			.setCustomId('SpydFemale')
			.setStyle('SECONDARY')
			.setEmoji('<:spy_female_OwO:872170662771458151>')
			.setLabel('Female');

		const ButtonRow1 = new MessageActionRow()
			.addComponents(MaleRole, FemaleRole);

		const AnnouncementRole = new MessageButton()
			.setCustomId('SpydAnnouncement')
			.setStyle('SECONDARY')
			.setEmoji('<a:Announcement:872171572193034270>')
			.setLabel('Announcements');

		const PartnerRole = new MessageButton()
			.setCustomId('SpydPartner')
			.setStyle('SECONDARY')
			.setEmoji('<a:PartnerShine:872172947257835590>')
			.setLabel('Partnership Ping');

		const PollRole = new MessageButton()
			.setCustomId('SpydPoll')
			.setStyle('SECONDARY')
			.setEmoji('<a:pollselfrole:872173706737254470>')
			.setLabel('Polls');

		const NoPartnerRole = new MessageButton()
			.setCustomId('SpydNoPartner')
			.setStyle('SECONDARY')
			.setEmoji('<a:pingWtf:872173962140979240>')
			.setLabel('No Partnership');

		const ButtonRow2 = new MessageActionRow()
			.addComponents(AnnouncementRole, PartnerRole, PollRole, NoPartnerRole);

		const HeistRole = new MessageButton()
			.setCustomId('SpydHeist')
			.setStyle('SECONDARY')
			.setEmoji('<:moneyheist:872174944023367691>')
			.setLabel('Heists');

		const GiveawayRole = new MessageButton()
			.setCustomId('SpydGiveaway')
			.setStyle('SECONDARY')
			.setEmoji('<:paisaaa:872175595470094346>')
			.setLabel('Giveaways');

		const FlashGiveawayRole = new MessageButton()
			.setCustomId('SpydFlashGiveaway')
			.setStyle('SECONDARY')
			.setEmoji('<:moneygaw1:872176277824622713>')
			.setLabel('Flash Giveaways');

		const RaffleRole = new MessageButton()
			.setCustomId('SpydRaffle')
			.setStyle('SECONDARY')
			.setEmoji('<:eventsping:872176693480132668>')
			.setLabel('Raffles');

		const OutsideHeistRole = new MessageButton()
			.setCustomId('SpydOutsideHeist')
			.setStyle('SECONDARY')
			.setEmoji('<:heists:872176990822752329>')
			.setLabel('Outside Heists');

		const ButtonRow3 = new MessageActionRow()
			.addComponents(HeistRole, GiveawayRole, FlashGiveawayRole, RaffleRole, OutsideHeistRole);

		const BingoRole = new MessageButton()
			.setCustomId('SpydBingo')
			.setStyle('SECONDARY')
			.setEmoji('<:Spy_bingo_OwO:872177880996667453>')
			.setLabel('Bingo');

		const MudaeRole = new MessageButton()
			.setCustomId('SpydMudae')
			.setStyle('SECONDARY')
			.setEmoji('🍵')
			.setLabel('Mudae');

		const GuessTheNumberRole = new MessageButton()
			.setCustomId('SpydGTN')
			.setStyle('SECONDARY')
			.setEmoji('<a:thinkcollapse:872178993258954802>')
			.setLabel('Guess the Number');

		const ButtonRow4 = new MessageActionRow()
			.addComponents(BingoRole, MudaeRole, GuessTheNumberRole);

		const BroBotRole = new MessageButton()
			.setCustomId('SpydBroBot')
			.setStyle('SECONDARY')
			.setEmoji('<:brobot:872179580444749865>')
			.setLabel('Bro Bot Player');

		const ButtonRow5 = new MessageActionRow()
			.addComponents(BroBotRole);

		const OwOAnnouncementsRole = new MessageButton()
			.setCustomId('SpydOwOAnnouncements')
			.setStyle('SECONDARY')
			.setEmoji('📡')
			.setLabel('OwO Announcements');

		const OwOShopRole = new MessageButton()
			.setCustomId('SpydOwOShop')
			.setStyle('SECONDARY')
			.setEmoji('🛒')
			.setLabel('OwO Shop');

		const OwOGiveawayRole = new MessageButton()
			.setCustomId('SpydOwOGiveaway')
			.setStyle('SECONDARY')
			.setEmoji('<:owocash:872181957189062696>')
			.setLabel('OwO Giveaways');

		const OwODistortedRole = new MessageButton()
			.setCustomId('SpydOwODistorted')
			.setStyle('SECONDARY')
			.setEmoji('<a:distorted:872182438850338816>')
			.setLabel('Guess the Number');

		const ButtonRow6 = new MessageActionRow()
			.addComponents(OwOAnnouncementsRole, OwOShopRole, OwOGiveawayRole, OwODistortedRole);

		if (args[0] === '1') message.channel.send({ content: 'Grab some gender roles!', components: [ButtonRow1] });

		if (args[0] === '2') message.channel.send({ content: 'Grab some ping roles!', components: [ButtonRow2] });

		if (args[0] === '3') message.channel.send({ content: 'Grab some event roles!', components: [ButtonRow3] });

		if (args[0] === '4') message.channel.send({ content: 'Grab some event roles!', components: [ButtonRow4] });

		if (args[0] === '5') message.channel.send({ content: 'Grab the Bro Bot Player role!', components: [ButtonRow5] });

		if (args[0] === '6') message.channel.send({ content: 'Grab some OwO roles!', components: [ButtonRow6] });
	},
};