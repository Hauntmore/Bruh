module.exports = {
	name: 'hack',
	description: 'Hack a user. (For Discord API Terms of Service reasons, yes this is a joke). Also found and modified from [Dank Memer v5 Source Code](https://dankmemer.lol/source).',
	usage: '<member|text>',
	example: ['hack @Hauntless#3212', 'hack @Polaris#0525'],
	botPermissions: ['EMBED_LINKS', 'SEND_MESSAGES', 'VIEW_CHANNEL', 'READ_MESSAGE_HISTORY'],
	args: true,
	cooldown: 5,
	async execute(message, { args }) {
		const { client } = message;
		const user = message.mentions.members.last() || message.guild.members.cache.get(args[0]);
		let hacked;
		if (user) {
			hacked = user;
		} else {
			hacked = args.slice(0).join(' ');
		}
		const prompt = await message.channel.send({ content: `Hacking ${user ? hacked.user.username : hacked} now...` });
		await client.utils.delay(1000);
		if (user) {
			await prompt.edit('Finding Discord login (attempting to bypass 2FA)...');
			await client.utils.delay(1700);
			await prompt.edit(`Found:\n**Email**: \`${hacked.user.username}***@gmail.com\`\n**Password**: \`*******\`.`);
			await client.utils.delay(1700);
			await prompt.edit('Fetching direct-messages..');
			await client.utils.delay(1000);
			await prompt.edit('Locating friends (if they have any even lmao).');
			await client.utils.delay(2000);
			await prompt.edit('Listing most common words...');
			await client.utils.delay(1000);
			await prompt.edit(`Injecting virus into discriminator #${hacked.user.discriminator}.`);
			await client.utils.delay(1000);
			await prompt.edit('Virus injected!');
			await client.utils.delay(1000);
			await prompt.edit('Source user token has been fetched.');
			await client.utils.delay(1000);
		}
		await prompt.edit('Stealing social security number.....');
		await client.utils.delay(1500);
		await prompt.edit('Finding used condom website viruses.');
		await client.utils.delay(1500);
		await prompt.edit('Injecting accidental porn/condom website viruses..');
		await client.utils.delay(1500);
		await prompt.edit('Finding IP address.');
		await client.utils.delay(2000);
		await prompt.edit('Spamming email...');
		await client.utils.delay(1000);
		await prompt.edit('Selling data to Facebook...');
		await client.utils.delay(1000);
		await prompt.edit(`Finished hacking ${user ? hacked.user.username : hacked}.`);
		message.channel.send({ content: 'The *totally* real and dangerous hack is complete.' });
	},
};