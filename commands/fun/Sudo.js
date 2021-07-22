module.exports = {
	name: 'sudo',
	aliases: ['copycat'],
	usage: '<member> <text>',
	description: 'Copycat someone.',
	example: ['sudo @Hauntless#3212 Hi, I\'m so sus.', 'copycat 840396899139452948 im down bad'],
	args: true,
	botPermissions: ['MANAGE_WEBHOOKS', 'SEND_MESSAGES', 'VIEW_CHANNEL', 'READ_MESSAGE_HISTORY'],
	cooldown: 3,
	execute(message, { args }) {
		const { client } = message;

		const errorEmbed = (msg) => client.makeEmbed({ description: msg, timestamp: message.createdAt });

		const member = message.mentions.members.last() || message.guild.members.cache.get(args[0]);
		if (!member) return message.reply({ embeds: [errorEmbed('This member does not exist within this guild.')] });

		const msg = args.slice(1).join(' ');
		if (!msg) return message.reply({ embeds: [errorEmbed('You need to add some text for the sudo!')] });

		message.channel.createWebhook(member.user.username, { avatar: member.user.displayAvatarURL({ dynamic: true }) }).then(webhook => {
			webhook.send({ content: msg });
			setTimeout(async () => {
				await webhook.delete();
			}, 3000);
		});
	},
};