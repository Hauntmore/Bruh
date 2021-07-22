const { MessageButton, MessageActionRow } = require('discord.js');

module.exports = {
	name: 'source',
	aliases: ['github'],
	description: 'View the bot\'s source code.',
	botPermissions: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'EMBED_LINKS', 'READ_MESSAGE_HISTORY'],
	execute(message) {
		const { client } = message;

		const ButtonRow = new MessageActionRow()
			.addComponents(new MessageButton().setURL(client.config.botgithub).setLabel('GitHub Repository!').setStyle('LINK'));

		const embed = client.makeEmbed()
			.setTitle(client.user.username)
			.setURL(client.user.displayAvatarURL({ format: 'png' }))
			.setThumbnail(client.user.displayAvatarURL({ dynamic: true, format: 'png' }))
			.setTimestamp()
			.setDescription(`Click here to view the bot's source. ${client.utils.link('GitHub', client.config.botgithub)}`)
			.setFooter(`Total Servers: ${client.guilds.cache.size.toLocaleString()}`);

		message.channel.send({ embeds: [embed], components: [ButtonRow] });
	},
};