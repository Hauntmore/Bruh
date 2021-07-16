module.exports = {
	name: 'awayfromkeyboard',
	aliases: ['afk'],
	description: 'Set your AFK.',
	usage: '[afk message]',
	example: ['afk sleeping', 'awayfromkeyboard'],
	botPermissions: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'EMBED_LINKS', 'READ_MESSAGE_HISTORY'],
	cooldown: 3,
	execute(message, { args }) {
		const { client } = message;

		const afk = args.slice(0).join(' ') || 'AFK';

		client.db.setAFK(message.author.id, 'true', afk);

		message.channel.send({ embeds: [client.makeEmbed().setAuthor(message.author.tag, message.author.displayAvatarURL()).setTitle('AFK').setDescription(afk).setTimestamp()] });
	},
};