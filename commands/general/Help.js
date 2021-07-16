const { MessageButton, MessageActionRow } = require('discord.js');

module.exports = {
	name: 'help',
	aliases: ['commands'],
	description: 'View the available bot commands.',
	usage: '<command|category>',
	example: ['help reddit', 'help prefix'],
	botPermissions: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'EMBED_LINKS', 'READ_MESSAGE_HISTORY'],
	async execute(message, { args }) {
		const query = args[0]?.toLowerCase(), { client } = message;
		const commands = client.commands;
		const command = commands.find(c => c.name?.toLowerCase() === query
            || c.aliases?.map(a => a.toLowerCase())?.includes(query),
		);

		const categories = [...new Set(commands.map(c => c.category))];

		const embed = client.makeEmbed()
			.setThumbnail(client.user.displayAvatarURL({ dynamic: true, size: 1024 }))
			.setTimestamp()
			.setFooter(`${commands.size} Commands • ${categories.length} Categories`);

		/* if (!query) {
			embed.addField(
				'Here is the list of my categories:',
				categories.length
					? categories.map(c => c.title()).join(', ')
					: 'None',
			);
		} */

		if (!query) {
			embed.setTitle(client.user.username);
			embed.setDescription('You can join the very messy testing server at [this server](https://discord.gg/gE6KcBHRqE), and we do ask however that you use common sense at the server.');
			embed.addField('⚙️ Configure', `\`${client.defaultPrefix} help configure\``, true);
			embed.addField('😁 Fun', `\`${client.defaultPrefix} help fun\``, true);
			embed.addField('🔗 General', `\`${client.defaultPrefix} help general\``, true);
			embed.addField('📷 Image', `\`${client.defaultPrefix} help image\``, true);
			embed.addField('ℹ️ Information', `\`${client.defaultPrefix} help information\``, true);
			embed.addField('🔨 Moderation', `\`${client.defaultPrefix} help moderation\``, true);
			embed.addField('💻 Reddit', `\`${client.defaultPrefix} help reddit\``, true);
			embed.addField('🛡 Utilities', `\`${client.defaultPrefix} help utilities\``, true);

		} else if (command) {
			embed.setTitle(command.name);
			if (command.description) {embed.setDescription(command.description);}

			if (command.aliases) {embed.addField('Aliases', command.aliases.join(', '));}

			if (command.cooldown) {embed.addField('Cooldown', `${command.cooldown}`);}

			if (command.usage) {
				embed.addField('Usage', Array.isArray(command.usage)
					? `${command.usage.map(u => `\`${u}\``).join('\n')}`
					: `\`${command.usage}\``,
				);
			}

			if (command.example) {
				embed.addField('Example', Array.isArray(command.example)
					? `${command.example.map(u => `\`${u}\``).join('\n')}`
					: `\`${command.example}\``,
				);
			}
		} else if (categories.includes(query)) {
			const cmds = commands.filter(c => c.category === query);
			embed.setTitle(query.title());
			embed.setDescription(cmds.size
				? cmds.map(c => `\`${c.name}\``).join(' ')
				: 'No commands are available for this category.',
			);
		} else {return message.reply({ content: 'My god is it that hard for you to give me a query that exists?' });}

		const ButtonRow = new MessageActionRow()
			.addComponents(new MessageButton().setCustomId('1').setLabel('🗑️').setStyle('SECONDARY'));

		const msg = await message.reply({ embeds: [embed], components: [ButtonRow] });

		const filter = (interaction) => interaction.customId === '1' && interaction.user.id === message.author.id;
		msg.awaitMessageComponent({ filter, time: 30000 })
			// eslint-disable-next-line no-unused-vars
			.then(interaction => {
				msg.delete();
				message.delete();
			})
			.catch(() => {
				msg.edit({ components: [] });
			});
	},
};