module.exports = {
	name: 'hack',
	description: '*Hack* a user. ;)',
	options: [{
		name: 'member',
		type: 6,
		description: 'The member to *hack*.',
		required: true,
	}],
	async execute(interaction) {
		const { client } = interaction;

		const member = interaction.options.getMember('member', true);

		const prompt = await interaction.reply({ content: `Hacking ${member.user.tag} now...` });

		await client.utils.delay(1500);

		await prompt.edit('Finding Discord login (attempting to bypass 2FA)...');
		await client.utils.delay(1700);
		await prompt.edit(`Found:\n**Email**: \`${member.user.tag}***@gmail.com\`\n**Password**: \`*******\`.`);
		await client.utils.delay(1700);
		await prompt.edit('Fetching direct-messages..');
		await client.utils.delay(1000);
		await prompt.edit('Locating friends (if they have any even lmao).');
		await client.utils.delay(2000);
		await prompt.edit('Listing most common words...');
		await client.utils.delay(1000);
		await prompt.edit(`Injecting virus into discriminator #${member.user.discriminator}.`);
		await client.utils.delay(1000);
		await prompt.edit('Virus injected!');
		await client.utils.delay(1000);
		await prompt.edit('Source user token has been fetched.');
		await client.utils.delay(1000);
		await prompt.edit('Inspecting all of the user\'s developer apps..');
		await client.utils.delay(5000);

		await prompt.edit('Awaiting to fetch all findable passwords.');
		await client.utils.delay(4000);
		await prompt.edit('Passwords found.. Copying data..');
		await client.utils.delay(3500);
		await prompt.edit('Importing dangerous jar files and IP grabbers into the user\'s operating system..');
		await client.utils.delay(3000);
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
		await prompt.edit(`Finished hacking ${member.user.username}.`);

		await interaction.reply({ content: 'The *totally* real and dangerous hack is complete.' });
	},
};