module.exports = {
	name: 'rename',
	aliases: ['setnick', 'setnickname'],
	description: 'Rename a member',
	usage: '<member>',
	example: ['rename @Hauntless#3212', 'setnick 673612822495756354'],
	botPermissions: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'MANAGE_NICKNAMES', 'READ_MESSAGE_HISTORY'],
	userPermissions: ['MANAGE_NICKNAMES'],
	args: true,
	async execute(message, { args }) {
		const { client } = message;
		const errorEmbed = (msg) => client.makeEmbed({ description: msg, timestamp: message.createdAt });

		const member = message.mentions.members.last() || message.guild.members.cache.get(args[0]);
		if (!member) return message.reply({ content: 'I cannnot parse that member!' });

		if (message.guild.ownerID !== message.member.id) {
			if (member.roles.highest.position >= message.member.roles.highest.position) return message.reply({ embeds: [errorEmbed('You cannot manage someone with an equal or higher position.')] });
		}
		if (member.roles.highest.position >= message.guild.me.roles.highest.position) return message.reply({ embeds: [errorEmbed('I can\'t edit this member due to my position being equal or lower to them.')] });

		const nickname = args.slice(1).join(' ');

		await member.setNickname(nickname);
		message.reply({ content: `You have changed ${member.user.tag}'s nickname.` });
	},
};