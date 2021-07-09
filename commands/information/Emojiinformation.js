const moment = require('moment');

module.exports = {
	name: 'emojiinformation',
	aliases: ['emojiinfo', 'ei'],
	description: 'Get data about the given emoji.',
	usage: '<emoji>',
	example: 'emojiinformation :KEK:',
	botPermissions: ['EMBED_LINKS', 'SEND_MESSAGES', 'MANAGE_EMOJIS', 'VIEW_CHANNEL', 'READ_MESSAGE_HISTORY'],
	args: true,
	cooldown: 5,
	async execute(message, { args }) {
		const { client } = message;
		const emote = args.join(' ');
		const regex = emote.replace(/^<a?:\w+:(\d+)>$/, '$1');
		const emoji = message.guild.emojis.cache.find((emj) => emj.name === emote || emj.id === regex);
		if (!emoji) return message.reply({ content: 'I cannot find that emoji!' });
		const authorFetch = await emoji.fetchAuthor();
		const embed = client.makeEmbed()
			.setDescription('Emoji Information for ' + emoji.name.toLowerCase())
			.setTimestamp()
			.setFooter(`ID: ${emoji.id} | ${client.user.tag}`)
			.setThumbnail(emoji.url)
			.addField('**❯ URL -**', `[Link](${emoji.url})`, false)
			.addField('**❯ Author by -**', `${authorFetch} (${authorFetch.id})`, false)
			.addField('**❯ Added at -**', `${moment(emoji.createdTimestamp).format('LT')} ${moment(emoji.createdTimestamp).format('LL')} | ${moment(emoji.createdTimestamp).fromNow()}`, false)
			.addField('**❯ Accessible by -**', `${emoji.roles.cache.map((role) => role.name).join(', ') || 'Everyone'}`, false)
			.addField('**❯ Requires Colon -**', `${client.utils.checkOrCross(emoji.requiresColons)}`, false)
			.addField('**❯ Deletable -**', `${client.utils.checkOrCross(emoji.deletable)}`, false)
			.addField('**❯ Managed -**', `${client.utils.checkOrCross(emoji.managed)}`, false)
			.addField('**❯ Animated -**', `${client.utils.checkOrCross(emoji.managed)}`, false);
		message.channel.send({ embeds: [embed] });
	},
};