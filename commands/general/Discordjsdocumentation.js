const fetch = require('node-fetch');
const { MessageButton, MessageActionRow } = require('discord.js');

module.exports = {
	name: 'discordjsdocumentation',
	aliases: ['djsdocs', 'djsdoc', 'discordjsdocs', 'discordjsdoc', 'djs'],
	description: 'Search the discord.js documentation for a query.',
	usage: '<query>',
	example: ['djs Client', 'djsdocs client.ws.ping'],
	botPermissions: ['EMBED_LINKS', 'SEND_MESSAGES', 'VIEW_CHANNEL', 'READ_MESSAGE_HISTORY'],
	args: true,
	async execute(message, { content }) {
		const query = encodeURIComponent(content);
		let embed = await fetch(`https://djsdocs.sorta.moe/v2/embed?src=master&q=${query}`);
		embed = await embed.json();
		embed['color'] = 0x5865F2;

		const ButtonRow = new MessageActionRow()
			.addComponents(new MessageButton().setCustomId('1').setLabel('🗑️').setStyle('SECONDARY'));

		const msg = await message.reply({ content: 'test', embeds: [embed], allowedMentions: { repliedUser: true }, components: [ButtonRow] });

		const filter = (interaction) => interaction.customId === '1' && interaction.user.id === message.author.id;
		msg.awaitMessageComponent({ filter, time: 20000 })
			.then(() => {
				msg.delete();
				message.delete();
			})
			.catch(() => {
				msg.edit({ embeds: [embed], components: [] });
			});
	},
};