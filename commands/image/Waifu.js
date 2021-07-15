module.exports = {
	name: 'waifu',
	description: 'Send an image of a waifu.',
	botPermissions: ['EMBED_LINKS', 'SEND_MESSAGES', 'VIEW_CHANNEL'],
	cooldown: 3,
	execute(message) {
		const { client } = message;
		const embed = client.makeEmbed()
			.setTitle('A waifu!')
			.setImage(`https://www.thiswaifudoesnotexist.net/example-${Math.floor(Math.random() * 100000)}.jpg`)
			.setTimestamp();
		message.channel.send({ embeds: [embed] });
	},
};