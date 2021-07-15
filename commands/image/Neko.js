const fetch = require('node-fetch');

module.exports = {
	name: 'neko',
	description: 'Send an image of a neko.',
	botPermissions: ['EMBED_LINKS', 'SEND_MESSAGES', 'VIEW_CHANNEL'],
	cooldown: 3,
	async execute(message) {
		const { url } = await fetch('https://nekos.life/api/v2/img/neko').then((res) => res.json());
		const embed = message.client.makeEmbed()
			.setTitle('A neko!')
			.setImage(url)
			.setTimestamp();
		message.channel.send({ embeds: [embed] });
	},
};