/* eslint-disable no-case-declarations */
const Guild = require('../../models/Guild');

module.exports = {
	name: 'prefix',
	aliases: ['setprefix'],
	description: 'Configure the guild prefix(es).',
	usage: ['<prefix>', 'remove|- <prefix>'],
	example: ['prefix g?', 'prefix'],
	botPermissions: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'EMBED_LINKS', 'READ_MESSAGE_HISTORY'],
	userPermissions: ['MANAGE_GUILD'],
	async execute(message, { args }) {
		let [sub, prefix] = args;
		const { client } = message;
		let guild = await Guild.findOne({ id: message.guild.id });

		if (!guild) {
			await new Guild({ id: message.guild.id }).save();
			guild = await Guild.findOne({ id: message.guild.id });
		}

		if (!sub) {
			const embed = client.makeEmbed()
				.setTitle(`Prefixes for ${message.guild.name}`)
				.setDescription(guild.prefixes.join('\n'))
				.setTimestamp();
			return message.channel.send({ embeds: [embed] });
		}

		sub = sub?.toLowerCase();
		prefix = prefix?.toLowerCase();
		switch (sub) {
		case 'remove':
		case '-':
			if (!guild.prefixes.includes(prefix)) {return message.reply({ content: 'That is not an existing prefix!' });}
			guild.prefixes.splice(guild.prefixes.indexOf(prefix), 1);
			await guild.save();
			message.channel.send({ content: `You have removed \`${prefix}\` from the guild prefix list.` });
			break;
		default:
			if (!sub.match(/.{1,15}/)) {return message.reply({ content: 'Your prefix must be less than 15 characters long!' });}
			if (guild.prefixes.length >= 50) {return message.reply({ content: 'The maximum amount of prefixes you can have (50), has been reached.' });}
			guild.prefixes.push(sub);
			await guild.save();
			message.channel.send({ content: `You have added \`${sub}\` as a prefix.` });
		}

		client.prefixCache[message.guild.id] = guild.prefixes;
	},
};