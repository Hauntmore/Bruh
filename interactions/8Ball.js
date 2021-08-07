module.exports = {
	name: '8ball',
	description: 'Ask the magical 8ball something.',
	options: [{
		name: 'question',
		type: 'STRING',
		description: 'The question to ask the 8ball.',
		required: true,
	}],
	async execute(interaction) {
		const responses = ['As I see it, yes.', 'Ask again later.', 'Better not tell you now.', 'Cannot predict now.', 'Concentrate and ask again.',
			'Don’t count on it.', 'It is certain.', 'It is decidedly so.', 'Most likely.', 'My reply is no.', 'My sources say no.',
			'Outlook not so good.', 'Outlook good.', 'Reply hazy, try again.', 'Signs point to yes.', 'Very doubtful.', 'Without a doubt.',
			'Yes.', 'Yes – definitely.', 'You may rely on it.'];

		const answer = Math.floor(Math.random() * responses.length);

		const embed = interaction.client.makeEmbed()
			.setTitle('8ball')
			.setDescription(`🎱 | Question: ${interaction.options.getString('question', true)}\n\n💬 | Answer: ${responses[answer]}`)
			.setTimestamp();

		await interaction.reply({ embeds: [embed] });
	},
};