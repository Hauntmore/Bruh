module.exports = {
	name: 'guildMemberAdd',
	async execute(member) {
		const guildDB = await member.client.db.guildDB(member.guild.id);

		let msg = guildDB.joinLogsMessage;
		msg = msg.replaceAll('{user.tag}', member.user.tag);
		msg = msg.replaceAll('{user.mention}', member.toString());
		msg = msg.replaceAll('{guild.name}', member.guild.name);
		msg = msg.replaceAll('{guild.memberCount}', member.guild.members.cache.size.toLocaleString());

		const channel = member.client.channels.cache.get(guildDB.joinLogsChannel);
		channel?.send(msg);
	},
};
