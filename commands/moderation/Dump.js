const { MessageAttachment } = require('discord.js');

module.exports = {
	name: 'dump',
	description: 'Allow you to dump all the user\'s with the given role.',
	usage: '<role>',
	example: ['dump 846614342715179008', 'dump @Members'],
	botPermissions: ['EMBED_LINKS', 'SEND_MESSAGES', 'VIEW_CHANNEL', 'MANAGE_ROLES', 'READ_MESSAGE_HISTORY'],
	userPermissions: ['MANAGE_ROLES'],
	args: true,
	execute(message, { args }) {
		const { client } = message;
		const errorEmbed = (msg) => client.makeEmbed({ description: msg, timestamp: message.createdAt });
		const rolename = args[0];
		const role = message.mentions.roles.first() || message.guild.roles.cache.find((role) => (role.id === rolename) || (role.name.toLowerCase() === rolename.toLowerCase()));
		if (!role) return message.reply({ embeds: [errorEmbed('I couldn\'t fetch that role from the guild!')] });
		const dump = role.members.map((m) => `${m.user.tag} (${m.user.id})`).join('\n');
		if (dump.length > 1969) {
			const result = new MessageAttachment(Buffer.from(dump), `${message.guild.name}-dump.txt`);
			message.reply({ content: `Users with the [${role.name}] role.\n\n`, files: [result] });
		} else {message.channel.send({ content: `Users with the [${role.name}] role.\n\n${dump}` });}
	},
};