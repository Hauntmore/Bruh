module.exports = {
	name: 'jail',
	description: 'Jail someone',
	usage: '[user]',
	example: ['jail @Hauntless#3212', 'jail 843217451550244934'],
	botPermissions: ['SEND_MESSAGES', 'EMBED_LINKS', 'VIEW_CHANNEL'],
	cooldown: 2,
	async execute(message, { args }) {
		const { client } = message;
		const user = message.mentions.users.last() || await client.users.fetch(args[0]).catch(() => null) || message.author;
		const embed = client.makeEmbed()
			.setTitle('Jailed ' + user.tag)
			.setImage(encodeURI(`https://api.devs-hub.xyz/jail?image=${user.displayAvatarURL({ format: 'png' })}`))
			.setTimestamp();
		message.channel.send({ embeds: [embed] });
	},
};