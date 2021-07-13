const { MessageButton } = require('discord.js');

module.exports = {
	name: 'ban',
	description: 'Allow server moderators to ban a member from the guild.',
	usage: '<member> [reason]',
	example: ['ban 749732650209640529 down bad.', 'ban 749732650209640529'],
	botPermissions: ['EMBED_LINKS', 'SEND_MESSAGES', 'VIEW_CHANNEL', 'BAN_MEMBERS', 'READ_MESSAGE_HISTORY'],
	userPermissions: ['BAN_MEMBERS'],
	args: true,
	async execute(message, { args }) {
		const { client } = message;
		const errorEmbed = (msg) => client.makeEmbed({ description: msg, timestamp: message.createdAt });
		const member = message.mentions.members.last() || message.guild.members.cache.get(args[0]);

		if (member.user.id === client.user.id) return message.reply({ embeds: [errorEmbed('You cannot ban me!')] });
		if (member.user.id === message.author.id) return message.reply({ embeds: [errorEmbed('You cannot ban you!')] });

		if (!member) return message.channel.send({ embeds: [errorEmbed('I cannot fetch this member!')] });

		if (message.guild.ownerID !== message.member.id) {
			if (member.roles.highest.position >= message.member.roles.highest.position) return message.reply({ embeds: [errorEmbed('You cannot ban someone with an equal or higher role.')] });
		}
		if (member.roles.highest.position >= message.guild.me.roles.highest.position) return message.reply({ embeds: [errorEmbed('I can\'t ban this member.')] });

		if (!member.bannable) return message.reply({ embeds: [errorEmbed('This member is not bannable.')] });

		let reason = args.slice(1).join(' ');
		if (!reason) reason = 'No reason provided.';
		if (reason.length > 1024) reason = reason.slice(0, 1021) + '...';

		const confirm = new MessageButton()
			.setCustomId('1')
			.setLabel('Continue')
			.setEmoji('<a:hb_check:814637252759912478>')
			.setStyle('SUCCESS');

		const cancel = new MessageButton()
			.setCustomId('2')
			.setLabel('Cancel')
			.setEmoji('<a:hb_cross:823305093452529674>')
			.setStyle('DANGER');

		const msg = await message.reply({ content: `Are you sure you would like to ban ${member.user.tag} from ${message.guild.name}?`, components: [[cancel, confirm]] });

		const filter = interaction => (interaction.customId === '1' || interaction.customId === '2') && interaction.user.id === message.author.id;
		msg.awaitMessageComponent({ filter, time: 15000 })
			.then(async (interaction) => {
				if (interaction.customId === '1') {
					await member.ban({ reason: reason });
					msg.edit({ content: `${member.user.tag} has been banned.`, components: [] });
				} else if (interaction.customId === '2') {
					msg.edit({ content: 'You have canceled this action.', components: [] });
				}
			})
			.catch(() => {
				msg.edit({ content: 'This action has timed out.', components: [] });
			});
	},
};