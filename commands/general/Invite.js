const { MessageButton, MessageActionRow } = require('discord.js');

module.exports = {
	name: 'invite',
	aliases: ['inviteme'],
	description: 'View the bot invite.',
	botPermissions: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'EMBED_LINKS', 'READ_MESSAGE_HISTORY'],
	execute(message) {
		const { client } = message;

		const ButtonRow = new MessageActionRow()
			.addComponents(new MessageButton().setURL(client.config.botinvite).setLabel('Invite me!').setStyle('LINK'));

		const embed = client.makeEmbed()
			.setTitle(client.user.username)
			.setURL(client.user.displayAvatarURL())
			.setThumbnail(client.user.displayAvatarURL({ dynamic: true, format: 'png' }))
			.setTimestamp()
			.setDescription(`We appreciate you for inviting ${client.user.username}! Thank you for supporting the bot development!\n\n**Click on the button to invite the bot!**`)
			.setFooter(`Total Servers: ${client.guilds.cache.size.toLocaleString()}`);

		message.channel.send({ embeds: [embed], components: [ButtonRow] });
	},
};