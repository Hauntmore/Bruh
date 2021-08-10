module.exports = {
	name: 'firstmessage',
	description: 'View the first message in channel.',
	options: [{
		name: 'channel',
		type: 7,
		description: 'The channel to fetch the first message from.',
	}],
	async execute(interaction) {
		const channel = interaction.options.getChannel('channel') || interaction.channel;
		const fetchMessages = await channel.messages.fetch({ after: 1, limit: 1 });

		const msg = fetchMessages.first();

		await interaction.reply({ embeds: [interaction.client.makeEmbed()
			.setTitle(`The first messsage in ${msg.channel.name}`)
			.setURL(msg.url)
			.setTimestamp()
			.setThumbnail(msg.author.displayAvatarURL({ dynamic: true }))
			.setDescription(`Content: ${msg.content}`)
			.addField('**❯ Author -**', `${msg.author}`, true)
			.addField('**❯ Message ID -**', `${msg.id}`, true)
			.addField('**❯ Message created at -**', `${msg.createdAt.toLocaleDateString()}`, true),
		] });
	},
};