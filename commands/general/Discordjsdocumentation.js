const fetch = require('node-fetch');
const { MessageButton } = require('discord.js');

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
		let embed = await fetch(`https://djsdocs.sorta.moe/v2/embed?src=stable&q=${query}`);
		embed = await embed.json();
		embed['color'] = 0x5865F2;
		const button = new MessageButton()
			.setCustomId('1')
			.setLabel('🗑️')
			.setStyle('SECONDARY');
		const msg = await message.reply({ embeds: [embed], allowedMentions: { repliedUser: true }, components: [[button]] });
		console.log(button.replied());

		const filter = (interaction) => interaction.customId === '1' && interaction.user.id === message.author.id;
		msg.awaitMessageComponent({ filter, time: 15000 })
			.then(() => {
				msg.delete();
				message.delete();
			})
			.catch(() => {
				msg.edit({ embeds: [embed], components: [] });
			});
	},
};