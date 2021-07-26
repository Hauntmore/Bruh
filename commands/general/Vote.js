const { MessageButton, MessageActionRow } = require('discord.js');

module.exports = {
	name: 'vote',
	aliases: ['voteme'],
	description: 'Vote for the bot! :)',
	botPermissions: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'EMBED_LINKS', 'READ_MESSAGE_HISTORY'],
	execute(message) {
		const { client } = message;

		const ButtonRow = new MessageActionRow()
			.addComponents(new MessageButton().setURL(client.config.botvote).setLabel('Vote for me!').setStyle('LINK'));

		const embed = client.makeEmbed()
			.setTitle(client.user.username)
			.setURL(client.user.displayAvatarURL({ format: 'png' }))
			.setThumbnail(client.user.displayAvatarURL({ dynamic: true, format: 'png' }))
			.setTimestamp()
			.setDescription(`Click here to be redirected to the top.gg website to vote for the bot. ${client.utils.link('Top.gg/Bruh-Bot', client.config.botvote)}`)
			.setFooter(`Total Servers: ${client.guilds.cache.size.toLocaleString()}`);

		message.channel.send({ embeds: [embed], components: [ButtonRow] });
	},
};