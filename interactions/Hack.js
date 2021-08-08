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

		await prompt.editReply('Finding Discord login (attempting to bypass 2FA)...');
		await client.utils.delay(1700);
		await prompt.editReply(`Found:\n**Email**: \`${member.user.tag}***@gmail.com\`\n**Password**: \`*******\`.`);
		await client.utils.delay(1700);
		await prompt.editReply('Fetching direct-messages..');
		await client.utils.delay(1000);
		await prompt.editReply('Locating friends (if they have any even lmao).');
		await client.utils.delay(2000);
		await prompt.editReply('Listing most common words...');
		await client.utils.delay(1000);
		await prompt.editReply(`Injecting virus into discriminator #${member.user.discriminator}.`);
		await client.utils.delay(1000);
		await prompt.editReply('Virus injected!');
		await client.utils.delay(1000);
		await prompt.editReply('Source user token has been fetched.');
		await client.utils.delay(1000);
		await prompt.editReply('Inspecting all of the user\'s developer apps..');
		await client.utils.delay(5000);

		await prompt.editReply('Awaiting to fetch all findable passwords.');
		await client.utils.delay(4000);
		await prompt.editReply('Passwords found.. Copying data..');
		await client.utils.delay(3500);
		await prompt.editReply('Importing dangerous jar files and IP grabbers into the user\'s operating system..');
		await client.utils.delay(3000);
		await prompt.editReply('Stealing social security number.....');
		await client.utils.delay(1500);
		await prompt.editReply('Finding used condom website viruses.');
		await client.utils.delay(1500);
		await prompt.editReply('Injecting accidental porn/condom website viruses..');
		await client.utils.delay(1500);
		await prompt.editReply('Finding IP address.');
		await client.utils.delay(2000);
		await prompt.editReply('Spamming email...');
		await client.utils.delay(1000);
		await prompt.editReply('Selling data to Facebook...');
		await client.utils.delay(1000);
		await prompt.editReply(`Finished hacking ${member.user.username}.`);

		await interaction.followUp({ content: 'The *totally* real and dangerous hack is complete.' });
	},
};