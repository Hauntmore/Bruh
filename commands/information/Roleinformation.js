const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'roleinformation',
	aliases: ['roleinfo', 'ri'],
	description: 'Sends data regarding the given role.',
	usage: '<role>',
	example: ['roleinformation @Members', 'roleinfo Member'],
	botPermissions: ['SEND_MESSAGES', 'EMBED_LINKS', 'VIEW_CHANNEL', 'READ_MESSAGE_HISTORY'],
	cooldown: 2,
	args: true,
	execute(message, { args }) {
		const { client } = message;
		const errorEmbed = (msg) => client.makeEmbed({ description: msg, timestamp: message.createdAt });
		const rolename = args[0];
		const role = message.mentions.roles.first() || message.guild.roles.cache.find((role) => (role.id === rolename) || (role.name.toLowerCase() === rolename.toLowerCase()));
		if (!role) return message.reply({ embeds: [errorEmbed('I couldn\'t fetch that role from the guild!')] });
		const embed = new MessageEmbed()
			.setTitle('Role information for ' + role.name)
			.addField('**❯ Color -**', `${role.hexColor}`, false)
			.addField('**❯ Members -**', `${role.members.size}`, false)
			.addField('**❯ Position -**', `${role.position}`, false)
			.addField('**❯ Hoisted -**', `${client.utils.checkOrCross(role.hoist)}`, false)
			.addField('**❯ Mentionable -**', `${client.utils.checkOrCross(role.mentionable)}`, false)
			.addField('**❯ Managed -**', `${client.utils.checkOrCross(role.managed)}`, false)
			.setFooter(`ID: ${role.id}`)
			.setColor(role.hexColor)
			.setTimestamp();
		message.channel.send({ embeds: [embed] });
	},
};