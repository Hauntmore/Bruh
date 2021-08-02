module.exports = {
	name: 'search',
	aliases: ['scout'],
	description: 'Search for some coins.',
	botPermissions: ['EMBED_LINKS', 'SEND_MESSAGES', 'VIEW_CHANNEL', 'READ_MESSAGE_HISTORY'],
	cooldown: 47,
	async execute(message) {
		const { client } = message;

		const chance = Math.floor(Math.random() * 10) + 1;
		const coinsGiven = Math.floor(Math.random() * 2045) + 70;

		const places = [
			'**Dumpster**',
			'**Toilet**',
			'**Discord Server**',
			'**Your Neighborhood Friendly White Van**',
			'**Your Mom\'s Room**',
			'**Roblox HQ**',
			'**Dauntless#0711\' DMs**',
			'**Hauntless\'s Computer**',
			'**FBI\'s Database**',
			'**An Old Lady\'s Purse*',
			'**Your Nigerian Prince\'s Castle**',
			'**Public School 69\'s Staff Room**',
			'**Discord Headquarters\'s Developer Room**',
			'**A Random Las Vegas Casino**',
			'**Warren Buffet\'s Bank Account**',
			'**Elon Musk\'s Space Ship**',
			'**The White House**',
			'**Your Neighbor\'s Taco Van**',
			'**Pantry**',
			'**A Very Haunted Basement**',
			'**Kim Kardashian\'s House**',
			'**Crawl Space**',
			'**The Tallest Tree Ever**',
			'**The Dirty Vacuum**',
			'**A Discord Stage Channel**',
			'**Area51**',
			'**A Private Discord Channel**',
			'**Bed**',
			'**Dusty Attic**',
			'**Hospital**',
			'**Your Discord DMs**',
			'**Your Bank Account**',
			'**A Safe**',
			'**A Yarrrr Pirate Ship**',
			'**A Fridge**',
			'**Captn\'s Bedroom**',
		];

		if (chance >= 1 && chance <= 5) {
			const array = [
				`You found \`$${coinsGiven.toLocaleString()}\` coins.`,
				`LMAO, you somehow.. somehow FOUND \`$${coinsGiven.toLocaleString()}\` coins.`,
				`Fucking jackoff you found \`$${coinsGiven.toLocaleString()}\` coins.`,
				`Oh ye poor homeless normie, yer found \`$${coinsGiven.toLocaleString()}\` coins.`,
				`Yer found \`$${coinsGiven.toLocaleString()}\` coins`,
				`You earn money this way? Down bad you found \`$${coinsGiven.toLocaleString()}\`.`,
				`You dirty normie, you found \`$${coinsGiven.toLocaleString()}\` coins.`,
				`Why is your income source from searching in weird places, yer found: \`$${coinsGiven.toLocaleString()}\`. Now go get a life pls.`,
				`Searching actually gave you coins moment: \`$${coinsGiven.toLocaleString()}\`.`,
				`You found a total coin amount of \`$${coinsGiven.toLocaleString()}\`.`,
				`You found \`$${coinsGiven.toLocaleString()}\` coins, now it is in yer wallet.`,
			];

			const embed = client.makeEmbed()
				.setTitle(places[Math.floor(Math.random() * places.length)])
				.setDescription(array[Math.floor(Math.random() * array.length)])
				.setFooter('Btw.. searching for coins is NOT a job.')
				.setTimestamp();
			message.channel.send({ embeds: [embed] });

			await client.db.addWallet(message.author.id, coinsGiven);
		} else {
			const arrays = [
				'You FOUND NOTHING!',
				'HAHHHAHHAHAH loser you found 0 coins.',
				'You\'re too stinky searching didn\'t even give you coins.',
				'You smell like fish, the money ran away from you!',
				'God smited the money, no more 4 u.',
				'Even the money didn\'t want you.',
				'Down bad the bot no likes u.',
				'You sadly did not find any coins.',
				'2 bad 4 u, you found NOTHING!',
				'You cannot be seriously searching for coins.',
				'Money says "GO AWAY!"',
				'Yer almost got found by police, luckily you got away bozo...',
				'A clown scared you off away from the free money!',
				'A psycho chased you off away from their money!',
				'A literal skunk scared yer away, such a chicken smh.',
			];

			const embed = client.makeEmbed()
				.setTitle(places[Math.floor(Math.random() * places.length)])
				.setDescription(arrays[Math.floor(Math.random() * arrays.length)])
				.setFooter('imagine searching, such a 2019 thing tbh.')
				.setTimestamp();
			message.reply({ embeds: [embed] });
		}
	},
};