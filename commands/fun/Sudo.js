const Discord = require('discord.js');

module.exports = {
	name: 'sudo',
	aliases: ['copycat'],
	usage: '<member> <text>',
	description: 'Copycat someone.',
	example: ['sudo @Hauntless#3212 Hi, I am so sus.', 'copycat 840396899139452948 im down bad'],
	botPermissions: ['MANAGE_WEBHOOKS', 'SEND_MESSAGES', 'VIEW_CHANNEL', 'READ_MESSAGE_HISTORY'],
	args: true,
	cooldown: 3,
	async execute(message, { args }) {
		const { client } = message;

		const webhooks = await message.channel.fetchWebhooks();

		const errorEmbed = (msg) => client.makeEmbed({ description: msg, timestamp: message.createdAt });

		const member = message.mentions.members.last() || message.guild.members.cache.get(args[0]);
		if (!member) return message.reply({ embeds: [errorEmbed('Unknown member.')] });

		const msg = Discord.Util.removeMentions(args.slice(1).join(' '));
		if (!msg) return message.reply({ embeds: [errorEmbed('You need to add some text for the command!')] });

		if (!webhooks.size) {
			const newWebhook = await message.channel.createWebhook('Bruh-Bot', { avatar: client.user.displayAvatarURL(), reason: 'For the sudo command.' });
			newWebhook.send({ username: member.user.username, avatarURL: member.user.displayAvatarURL({ dynamic: true }), content: msg });
		} else {
			const webhook = webhooks.first();
			webhook.send({ username: member.user.username, avatarURL: member.user.displayAvatarURL({ dynamic: true }), content: msg });
		}
	},
};