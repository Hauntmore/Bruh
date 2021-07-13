const { MessageEmbed } = require('discord.js');
const Tags = require('../../models/Tags');

module.exports = {
	name: 'tag',
	aliases: ['cc', 'tags'],
	description: 'Configure guild tags.',
	usage: '<create=content|delete> <cmd>',
	botPermissions: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'EMBED_LINKS', 'READ_MESSAGE_HISTORY'],
	userPermissions: ['MANAGE_GUILD'],
	args: true,
	async execute(message, { args }) {
		const { client } = message;

		if (!['create', 'delete', 'list'].includes(args[0].toLowerCase())) return message.channel.send({ content: 'You need to add some valid parameters..' });

		if (args[0].toLowerCase() === 'delete') {
			client.db.deleteGuildTag(message.guild.id, args[1]);
			message.channel.send({ content: `You have deleted the tag with the name \`${args[1]}\`.` });
		}

		if (args[0].toLowerCase() === 'create') {
			if (!args.slice(2).join(' ')) return message.channel.send({ content: 'This tag cannot have no content.' });
			client.db.createGuildTag(message.guild.id, args[1], args.slice(2).join(' '));
			message.channel.send({ content: `You have created the tag with the name \`${args[1]}\` with the following content:\n\n${args.slice(2).join(' ')}` });
		}

		if (args[0].toLowerCase() === 'list') {
			const data = await Tags.find({ id: message.guild.id });

			message.channel.send({ embeds: [new MessageEmbed().setColor('RANDOM').setDescription(data.map((cmd, i) => `${i + 1}. ${cmd.cmd}`).join('\n'))] });
		}
	},
};