module.exports = {
	name: 'beg',
	aliases: ['poor'],
	description: 'Beg for some coins.',
	botPermissions: ['EMBED_LINKS', 'SEND_MESSAGES', 'VIEW_CHANNEL', 'READ_MESSAGE_HISTORY'],
	cooldown: 35,
	async execute(message) {
		const { client } = message;

		const chance = Math.floor(Math.random() * 10) + 1;
		const coinsGiven = Math.floor(Math.random() * 2000) + 70;

		const people = [
			'**Jeff Bezos**',
			'**Madison Beer**',
			'**Donald Trump**',
			'**Charli**',
			'**Donald Duck**',
			'**Polo G**',
			'**Cats**',
			'**Amity**',
			'**Dauntless**',
			'**Hauntless**',
			'**Some random hobo**',
			'**Your nigerian prince uncle**',
			'**Lana Rhoades**',
			'**Lana Rhoades\'s kid**',
			'**Polaris**',
			'**Warren Buffet**',
			'**Elon Musk**',
			'**Obama**',
			'**Barack Obama**',
			'**Oprah Winfrey**',
			'**The Rock**',
			'**Kim Kardashian**',
			'**Joe Biden**',
			'**Lil Tjay**',
			'**Tom Cruise**',
			'**Keanu Reeves**',
			'**Some random school principle**',
			'**Discord**',
			'**Adam**',
			'**Emily**',
			'**Some random girl you hooked up with**',
			'**Ryan**',
			'**BTS**',
			'**Karen**',
			'**Olivia Rodrigo**',
			'**Captn**',
		];

		if (chance >= 1 && chance <= 6) {
			const array = [
				`They donated \`$${coinsGiven.toLocaleString()}\` coins to you.`,
				`They gave you \`$${coinsGiven.toLocaleString()}\` coins.`,
				`You are nice, here is \`$${coinsGiven.toLocaleString()}\` coins.`,
				`Oh ye poor beggar here is \`$${coinsGiven.toLocaleString()}\` coins.`,
				`Uh sure.. here is \`$${coinsGiven.toLocaleString()}\` coins`,
				`You earn money this way? smh here is \`$${coinsGiven.toLocaleString()}\` ya poor beggar.`,
				`They slapped you with \`$${coinsGiven.toLocaleString()}\` coins.`,
				`Why is your income source from begging, here are some coins: \`$${coinsGiven.toLocaleString()}\`. Now go away.`,
				`Ok fine, here are some coins 4 u \`$${coinsGiven.toLocaleString()}\`.`,
				`You are so desperate here are some coins for yer \`$${coinsGiven.toLocaleString()}\`.`,
				`Jeez no need to act so desperate here are some free poor people coins, \`$${coinsGiven.toLocaleString()}\`.`,
			];

			const embed = client.makeEmbed()
				.setTitle(people[Math.floor(Math.random() * people.length)])
				.setDescription(array[Math.floor(Math.random() * array.length)])
				.setFooter('Honestly surprised they gave you money, yer so damn poor.')
				.setTimestamp();
			message.channel.send({ embeds: [embed] });

			await client.db.addWallet(message.author.id, coinsGiven);
		} else {
			const arrays = [
				'No thanks, frick off kindly.',
				'Can you like not be a hobo? Go away.',
				'No, you\'re too stinky ew.',
				'You smell like fish, go away from me!',
				'Go to hell mate.',
				'Ya smell like pee so no thanks..',
				'You smell like fish no ty.',
				'Fuck off weirdo..',
				'Can you pls like not talk to me? no coins 4 u!',
				'You cannot be seriously asking me...',
				'Go AWAY!',
				'I\'ll give you money when you stop begging me (Which is never).',
				'You realize begging isn\'t a real profession ryt?',
			];

			const embed = client.makeEmbed()
				.setTitle(people[Math.floor(Math.random() * people.length)])
				.setDescription(arrays[Math.floor(Math.random() * arrays.length)])
				.setFooter('imagine begging, such as 2016 thing tbh.')
				.setTimestamp();
			message.reply({ embeds: [embed] });
		}
	},
};