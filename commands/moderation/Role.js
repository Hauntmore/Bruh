module.exports = {
	name: 'role',
	description: 'Reassign a role',
	usage: '<member> <role>',
	example: ['role @Hauntless#3212 Members', 'role 845379036816343092 Bots'],
	botPermissions: ['EMBED_LINKS', 'SEND_MESSAGES', 'VIEW_CHANNEL', 'MANAGE_ROLES', 'READ_MESSAGE_HISTORY'],
	userPermissions: ['MANAGE_ROLES'],
	args: true,
	async execute(message, { args }) {
		const { client } = message;
		const errorEmbed = (msg) => client.makeEmbed({ description: msg, timestamp: message.createdAt });

		const target = message.mentions.members.last() || message.guild.members.cache.get(args[0]);

		const rolename = args[1];
		const role = message.mentions.roles.first() || message.guild.roles.cache.find((role) => (role.id === rolename) || (role.name.toLowerCase() === rolename.toLowerCase()));

		if (!role) return message.channel.send({ embeds: [errorEmbed('Please for the love of christ enter in a valid role, is it that hard for you?')] });

		if (message.guild.ownerId !== message.member.id) {
			if (message.member.roles.highest.position <= role.position) return message.channel.send({ embeds: [errorEmbed('You cannot reassign that role.')] });
		}

		if (role.position >= message.guild.me.roles.highest.position) return message.channel.send({ embeds: [errorEmbed('I can\'t reassign that role.')] });

		if (target.roles.cache.get(role.id)) {
			try {
				target.roles.remove(role.id);
				return message.channel.send({ content: `**${target.user.tag}** was removed from the role **${role.name}**.` });
			} catch (err) {
				console.log(err);
			}
		} else {
			try {
				target.roles.add(role.id);
				return message.channel.send({ content: `**${target.user.tag}** was assigned the role **${role.name}**.` });
			} catch (err) {
				console.log(err);
			}
		}
	},
};