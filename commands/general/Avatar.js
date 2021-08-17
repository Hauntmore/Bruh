const { MessageButton, MessageActionRow } = require('discord.js');

module.exports = {
	name: 'avatar',
	aliases: ['av', 'pfp'],
	description: 'This command will allow display a user\'s avatar.',
	usage: '[user]',
	example: ['avatar @Hauntless', 'av 749732650209640529', 'pfp'],
	botPermissions: ['EMBED_LINKS', 'SEND_MESSAGES', 'VIEW_CHANNEL', 'READ_MESSAGE_HISTORY'],
	async execute(message, { args }) {
		const { client } = message;
		const user = message.mentions.users.last() || await client.users.fetch(args[0]).catch(() => null) || message.author;

		const ButtonRow = new MessageActionRow()
			.addComponents(new MessageButton().setURL(user.displayAvatarURL({ format: 'png' })).setLabel('png').setStyle('LINK'), new MessageButton().setURL(user.displayAvatarURL({ format: 'webp' })).setLabel('webp').setStyle('LINK'), new MessageButton().setURL(user.displayAvatarURL({ format: 'jpg' })).setLabel('jpg').setStyle('LINK'), new MessageButton().setURL(user.displayAvatarURL({ format: 'jpeg' })).setLabel('jpeg').setStyle('LINK'));

		const embed = client.makeEmbed()
			.setTitle(user.tag + '\'s Avatar')
			.setImage(user.displayAvatarURL({ dynamic: true, size: 1024 }));
		message.channel.send({ embeds: [embed], components: [ButtonRow] });
	},
};