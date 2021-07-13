module.exports = {
	name: 'avatar',
	aliases: ['av', 'pfp'],
	description: 'This command will allow display a user\'s avatar.',
	usage: '[user]',
	example: ['avatar @Hauntless', 'av 749732650209640529', 'pfp'],
	botPermissions: ['EMBED_LINKS', 'SEND_MESSAGES', 'VIEW_CHANNEL', 'READ_MESSAGE_HISTORY'],
	async execute(message, { args }) {
		const { client } = message;
		const user = message.mentions.users.last() || await client.users.fetch(args[0]).catch(() => null) || message.author;

		const embed = client.makeEmbed()
			.setTitle(user.tag + '\'s Avatar')
			.setImage(user.displayAvatarURL({ dynamic: true, size: 1024 }))
			.setDescription(`**Link as:**\n[png](${user.displayAvatarURL({ format : 'png' })}) | [gif](${user.displayAvatarURL({ format : 'gif' })}) | [jpg](${user.displayAvatarURL({ format : 'jpg' })}) | [webp](${user.displayAvatarURL({ format : 'webp' })})`);
		message.channel.send({ embeds: [embed] });
	},
};