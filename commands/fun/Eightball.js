module.exports = {
	name: 'eightball',
	aliases: ['8ball'],
	description: 'FInd your luck with this 8ball command.',
	usage: '<question>',
	example: ['8ball is @Hauntless#3212 gay', 'eightball will i be rich?'],
	botPermissions: ['EMBED_LINKS', 'SEND_MESSAGES', 'VIEW_CHANNEL', 'READ_MESSAGE_HISTORY'],
	args: true,
	cooldown: 5,
	execute(message, { args }) {
		const { client } = message;

		const question = args.slice(0).join(' ');

		const responses = ['As I see it, yes.', 'Ask again later.', 'Better not tell you now.', 'Cannot predict now.', 'Concentrate and ask again.',
			'Don’t count on it.', 'It is certain.', 'It is decidedly so.', 'Most likely.', 'My reply is no.', 'My sources say no.',
			'Outlook not so good.', 'Outlook good.', 'Reply hazy, try again.', 'Signs point to yes.', 'Very doubtful.', 'Without a doubt.',
			'Yes.', 'Yes – definitely.', 'You may rely on it.'];

		const answer = Math.floor(Math.random() * responses.length);

		const embed = client.makeEmbed()
			.setTitle('8ball')
			.setDescription(`🎱 | Question: ${question}\n\n💬 | Answer: ${responses[answer]}`)
			.setTimestamp();

		message.reply({ embeds: [embed] });
	},
};