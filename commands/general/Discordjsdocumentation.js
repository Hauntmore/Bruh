const fetch = require('node-fetch');
const { MessageButton, MessageActionRow } = require('discord.js');

module.exports = {
	name: 'discordjsdocumentation',
	aliases: ['djsdocs', 'djsdoc', 'discordjsdocs', 'discordjsdoc', 'djs'],
	description: 'Search the discord.js documentation for a query using this API: `https://djsdocs.sorta.moe/v2/embed?src=${project}&q=${Query}`.\nProject options: `stable`, `master`, `rpc`, `commando`, `akairo` or `akairo-master`.\nQuery: Input your documentation query.',
	usage: '<query>',
	example: ['djs Client', 'djsdocs client.ws.ping'],
	botPermissions: ['EMBED_LINKS', 'SEND_MESSAGES', 'VIEW_CHANNEL', 'READ_MESSAGE_HISTORY'],
	args: true,
	async execute(message, { content }) {
		const query = encodeURIComponent(content);
		let embed = await fetch(`https://djsdocs.sorta.moe/v2/embed?src=master&q=${query}`);
		embed = await embed.json();
		embed['color'] = 0x5865F2;

		try {
			const msg = await message.reply({ embeds: [embed], allowedMentions: { repliedUser: true }, components: [new MessageActionRow()
				.addComponents(new MessageButton().setCustomId('1').setLabel('🗑️').setStyle('SECONDARY'))] });

			const filter = (interaction) => interaction.customId === '1' && interaction.user.id === message.author.id;
			msg.awaitMessageComponent({ filter, time: 20000 })
				.then(() => {
					msg.delete();
					message.delete();
				})
				.catch(() => {
					msg.edit({ components: [] });
				});
		} catch (err) {
			console.log(err);
			message.channel.send({ content: 'The results from your query has exceeded the field limit of 1024 characters.' });
		}
	},
};