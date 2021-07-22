module.exports = {
	name: 'echo',
	description: 'Echo a message.',
	usage: '<text>',
	example: ['echo suspish', 'susb'],
	botPermissions: ['EMBED_LINKS', 'SEND_MESSAGES', 'VIEW_CHANNEL', 'READ_MESSAGE_HISTORY'],
	args: true,
	async execute(message, { args }) {
		const { client } = message;

		const content = args.slice(0).join(' ');

		if (!client.owners.includes(message.author.id)) {
			message.channel.send({ content: `${content}\n\n- **${message.author.tag}**` });
			await message.react('✅');
		} else if (client.owners.includes(message.author.id)) {
			message.delete();
			message.channel.send({ content: content });
		}
	},
};