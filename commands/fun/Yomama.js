const fetch = require('node-fetch');

module.exports = {
	name: 'yomama',
	aliases: ['yourmom', 'yourmomma', 'yourmama'],
	description: 'You can yo-mama someone.',
	usage: '<member>',
	example: ['yomama @Hauntless#3212', 'yomama 749732650209640529'],
	botPermissions: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'EMBED_LINKS', 'READ_MESSAGE_HISTORY'],
	cooldown: 5,
	args: true,
	async execute(message, { args }) {
		const { client } = message;

		const member = message.mentions.members.last() || message.guild.members.cache.get(args[0]);

		if (!member) return message.reply({ content: 'Down bad bro.. You thought you could yomama yo self!' });

		const { joke } = await fetch('http://api.yomomma.info').then((res) => res.json());

		const embed = client.makeEmbed()
			.setDescription(`${member}, ${joke}.`);
		message.reply({ embeds: [embed] });
	},
};