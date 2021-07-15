const { trumpPhotos, trumpResponses } = require('../../lib/json/trump.json');

module.exports = {
	name: 'asktrump',
	aliases: ['askdonald', 'whatdoestrumpthinkabout', 'whatdoesdonaldtrumpthinkabout', 'askdonaldtrump'],
	description: 'Ask trump something!',
	usage: '<question>',
	example: ['asktrump Do you like pie?', 'asktrump am I sus?'],
	botPermissions: ['EMBED_LINKS', 'SEND_MESSAGES', 'VIEW_CHANNEL', 'READ_MESSAGE_HISTORY'],
	args: true,
	cooldown: 10,
	execute(message, { args }) {
		const { client } = message;
		const embed = client.makeEmbed()
			.setDescription(`\n${message.author.username}: ${args.slice(0).join(' ')}\n\nDonald Trump: ${trumpResponses[Math.floor(Math.random() * trumpResponses.length)].toUpperCase()}`)
			.setThumbnail(trumpPhotos[Math.floor(Math.random() * trumpPhotos.length)])
			.setTimestamp();
		message.channel.send({ embeds: [embed] });
	},
};