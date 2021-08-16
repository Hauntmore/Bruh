const Discord = require('discord.js');

module.exports = {
	name: 'hack',
	description: 'Hack a user. (For Discord API Terms of Service reasons, yes this is a joke). Also found and modified from [Dank Memer v5 Source Code](https://dankmemer.lol/source).',
	usage: '<member|text>',
	example: ['hack @Hauntless#3212', 'hack @Polaris#0525', 'hack some normie'],
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
			hacked = Discord.Util.removeMentions(args.slice(0).join(' '));
		}

		const prompt = await message.channel.send({ content: `Hacking ${user ? hacked.user.username : hacked} now...` });

		await client.utils.delay(1500);

		if (user) {
			await prompt.edit({ content: 'Finding Discord login (attempting to bypass 2FA)...' });
			await client.utils.delay(1700);
			await prompt.edit({ content: `Found:\n**Email**: \`${hacked.user.username}***@gmail.com\`\n**Password**: \`*******\`.` });
			await client.utils.delay(1700);
			await prompt.edit({ content: 'Fetching direct-messages..' });
			await client.utils.delay(1000);
			await prompt.edit({ content: 'Locating friends (if they have any even lmao).' });
			await client.utils.delay(2000);
			await prompt.edit({ content: 'Listing most common words...' });
			await client.utils.delay(1000);
			await prompt.edit({ content: `Injecting virus into discriminator #${hacked.user.discriminator}.` });
			await client.utils.delay(1000);
			await prompt.edit({ content: 'Virus injected!' });
			await client.utils.delay(1000);
			await prompt.edit({ content: 'Source user token has been fetched.' });
			await client.utils.delay(1000);
			await prompt.edit({ content: 'Inspecting all of the user\'s developer apps..' });
			await client.utils.delay(5000);
		}

		await prompt.edit({ content: 'Awaiting to fetch all findable passwords.' });
		await client.utils.delay(4000);
		await prompt.edit({ content: 'Passwords found.. Copying data..' });
		await client.utils.delay(3500);
		await prompt.edit({ content: 'Importing dangerous jar files and IP grabbers into the user\'s operating system..' });
		await client.utils.delay(3000);
		await prompt.edit({ content: 'Stealing social security number.....' });
		await client.utils.delay(1500);
		await prompt.edit({ content: 'Finding used condom website viruses.' });
		await client.utils.delay(1500);
		await prompt.edit({ content: 'Injecting accidental porn/condom website viruses..' });
		await client.utils.delay(1500);
		await prompt.edit({ content: 'Finding IP address.' });
		await client.utils.delay(2000);
		await prompt.edit({ content: 'Spamming email...' });
		await client.utils.delay(1000);
		await prompt.edit({ content: 'Selling data to Facebook...' });
		await client.utils.delay(1000);
		await prompt.edit({ content: `Finished hacking ${user ? hacked.user.username : hacked}.` });

		message.channel.send({ content: 'The *totally* real and dangerous hack is complete.' });
	},
};