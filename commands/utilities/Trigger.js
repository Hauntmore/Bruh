const { MessageEmbed } = require('discord.js');
const Autoresponse = require('../../models/Autoresponse');

module.exports = {
	name: 'trigger',
	aliases: ['ar', 'autoresponse'],
	description: 'Configure guild triggers.',
	usage: '<create=content|delete|list=array|raw> <cmd>',
	botPermissions: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'EMBED_LINKS', 'READ_MESSAGE_HISTORY'],
	userPermissions: ['MANAGE_GUILD'],
	args: true,
	async execute(message, { args }) {
		const { client } = message;

		if (!['create', 'delete', 'list', 'raw'].includes(args[0].toLowerCase())) return message.channel.send({ content: 'You need to add some valid parameters..' });

		if (args[0].toLowerCase() === 'delete') {
			if (!args[1]) return message.channel.send({ content: 'Pls entering content to delete.' });
			await client.db.deleteGuildTrigger(message.guild.id, args[1]);
			message.channel.send({ content: `You have deleted the trigger with the name \`${args[1]}\`.` });
		}

		if (args[0].toLowerCase() === 'create') {
			if (!args.slice(2).join(' ')) return message.channel.send({ content: 'This trigger cannot have no content.' });
			if (!args[1]) return message.channel.send({ content: 'Please please enter in an autoresponse name...' });
			await client.db.createGuildTrigger(message.guild.id, args[1], args.slice(2).join(' '));
			message.channel.send({ content: `You have created the trigger with the name \`${args[1]}\` with the following content:\n\n${args.slice(2).join(' ')}` });
		}

		if (args[0].toLowerCase() === 'raw') {
			if (!args[1]) return message.channel.send({ content: 'You cannot view the raw content of a trigger if you don\'t give me something to fetch!' });
			const data = await Autoresponse.findOne({ id: message.guild.id, cmd: args[1] });
			if (!data) return message.channel.send({ content: 'You idiot! This trigger does not exist.' });
			if (data.length > 1970) return message.channel.send({ content: 'Sad this trigger content is longer than the threshold amount of 1970 characters. :(' });
			message.channel.send({ content: `Here is the raw autoresponse content of \`${args[1]}\`.\n\n${data.response}` });
		}

		if (args[0].toLowerCase() === 'list') {
			const data = await Autoresponse.find({ id: message.guild.id });
			message.channel.send({ embeds: [new MessageEmbed().setColor('RANDOM').setDescription(`List of the autoresponses within ${message.guild.name}!\n\n` + data.map((trigger, i) => `${i + 1}. ${trigger.trigger}`).join('\n'))] });
		}
	},
};