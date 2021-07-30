const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'messageDelete',
	async execute(oldMessage, newMessage) {
		if (oldMessage.partial || newMessage.partial || newMessage.author?.bot || !newMessage.guild || newMessage.attachments.size >= 1 || newMessage.embeds.size >= 1) return;

		const guildDB = await newMessage.client.db.guildDB(newMessage.guild.id);

		const embed = new MessageEmbed()
			.setAuthor(newMessage.author.tag, newMessage.author.displayAvatarURL({ dynamic: true, size: 1024 }))
			.setDescription(`**Message updated at ${newMessage.channel.name}**`)
			.addField('**Before**:', `${oldMessage.content}`, false)
			.addField('**After**:', `${newMessage.content}`, false)
			.setColor('BLUE')
			.setFooter(`ID: ${newMessage.author.id}`);

		const channel = newMessage.guild.channels.cache.get(guildDB.messageLogsChannel);

		if (channel) {
			channel.send({ embeds: [embed] });
		}
	},
};