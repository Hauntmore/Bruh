const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'messageDelete',
	async execute(message) {
		if (message.partial || message.author.bot || !message.guild || message.attachments.size >= 1 || message.embeds.size >= 1) return;

		const guildDB = await message.client.db.guildDB(message.guild.id);

		const embed = new MessageEmbed()
			.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true, size: 1024 }))
			.setDescription(`**Message deleted at ${message.channel.name}**`)
			.addField('**Content**:', `${message.content}`, false)
			.setColor('BLUE')
			.setFooter(`ID: ${message.author.id}`);

		const channel = message.guild.channels.cache.get(guildDB.messageLogsChannel);

		channel?.send({ embeds: [embed] });
	},
};