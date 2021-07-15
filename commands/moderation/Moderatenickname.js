const { MessageButton, MessageActionRow } = require('discord.js');

module.exports = {
	name: 'moderatenickname',
	aliases: ['moderatenick', 'modnick', 'modnickname'],
	description: 'Moderate someone\'s nickname.',
	usage: '<member>',
	example: ['modnick @Hauntless#3212', 'moderatenickname 673612822495756354'],
	botPermissions: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'MANAGE_NICKNAMES', 'READ_MESSAGE_HISTORY'],
	userPermissions: ['MANAGE_NICKNAMES'],
	args: true,
	async execute(message, { args }) {
		const { client } = message;
		const errorEmbed = (msg) => client.makeEmbed({ description: msg, timestamp: message.createdAt });
		const member = message.mentions.members.last() || message.guild.members.cache.get(args[0]);
		if (!member) return message.reply({ content: 'Your member input is invalid!' });

		if (message.guild.ownerID !== message.member.id) {
			if (member.roles.highest.position >= message.member.roles.highest.position) return message.reply({ embeds: [errorEmbed('You cannot manage someone with an equal or higher position.')] });
		}
		if (member.roles.highest.position >= message.guild.me.roles.highest.position) return message.reply({ embeds: [errorEmbed('I can\'t ban this member due to my position being equal or lower to them.')] });

		const finalNickname = 'Name-Moderated-User ' + client.utils.generateString(5);

		const cancel = new MessageButton()
			.setCustomId('1')
			.setLabel('Cancel')
			.setEmoji('<a:hb_cross:823305093452529674>')
			.setStyle('DANGER');

		const confirm = new MessageButton()
			.setCustomId('2')
			.setLabel('Continue')
			.setEmoji('<a:hb_check:814637252759912478>')
			.setStyle('SUCCESS');

		const ButtonRow = new MessageActionRow()
			.addComponents(cancel, confirm);

		const msg = await message.reply({ content: `Are you sure you would like to moderate ${member.user.tag}'s nickname?`, allowedMention: { repliedUser: true }, components: [ButtonRow] });

		const filter = interaction => (interaction.customId === '1' || interaction.customId === '2') && interaction.user.id === message.author.id;
		msg.awaitMessageComponent({ filter, time: 15000 })
			.then(async (interaction) => {
				if (interaction.customId === '1') {
					msg.edit({ content: 'You have canceled this action.', components: [] });
				} else if (interaction.customId === '2') {
					await member.setNickname(finalNickname);
					msg.edit({ content: `Success! Their nickname has been edited to \`${finalNickname}\`.`, components: [] });
				}
			})
			.catch(() => {
				msg.edit({ content: 'This action has timed out.', components: [] });
			});
	},
};