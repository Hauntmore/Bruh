module.exports = {
	name: 'unban',
	description: 'Allow server moderators to unban a user.',
	usage: '<user> [reason]',
	example: ['unban 749732650209640529 Appealed.', 'unban 749732650209640529'],
	botPermissions: ['EMBED_LINKS', 'SEND_MESSAGES', 'VIEW_CHANNEL', 'BAN_MEMBERS', 'READ_MESSAGE_HISTORY'],
	userPermissions: ['BAN_MEMBERS'],
	args: true,
	async execute(message, { args }) {
		const { client } = message;
		const errorEmbed = (msg) => client.makeEmbed({ description: msg, timestamp: message.createdAt });

		const rgx = /^(?:<@!?)?(\d+)>?$/;
		const id = args[0];

		let reason = args.slice(1).join(' ');
		if (!reason) reason = 'No reason provided.';
		if (reason.length > 1024) reason = reason.slice(0, 1021) + '...';

		if (!rgx.test(id)) return message.reply({ embeds: [errorEmbed('The ID provided does not match the user ID regex.')] });
		const bannedUsers = await message.guild.bans.fetch();

		const user = bannedUsers.get(id);

		if (!user) return message.reply({ embeds: [errorEmbed('This user is not a previously banned guild member.')] });

		await message.guild.members.unban(id, reason);

		message.channel.send({ content: `${user.user.tag} has been unbanned.` });
	},
};
