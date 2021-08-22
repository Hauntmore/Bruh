const moment = require('moment');
const filterLevels = {
	DISABLED: 'Off',
	MEMBERS_WITHOUT_ROLES: 'No Role',
	ALL_MEMBERS: 'Everyone',
};
const verificationLevels = {
	NONE: 'None',
	LOW: 'Low',
	MEDIUM: 'Medium',
	HIGH: 'High',
	VERY_HIGH: 'Very High',
};
const premiumTier = {
	NONE: 'Tier 0',
	TIER_1: 'Tier 1',
	TIER_2: 'Tier 2',
	TIER_3: 'Tier 3',
};

module.exports = {
	name: 'serverinformation',
	aliases: ['serverinfo', 'si'],
	description: 'Send information and stats about the guild.',
	botPermissions: ['SEND_MESSAGES', 'EMBED_LINKS', 'VIEW_CHANNEL', 'VIEW_GUILD_INSIGHTS', 'READ_MESSAGE_HISTORY'],
	cooldown: 5,
	async execute(message) {
		const { client } = message;

		const roles = message.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());

		const members = message.guild.members.cache;

		const emojis = message.guild.emojis.cache;

		const guildOwner = await message.guild.fetchOwner();

		const embed = client.makeEmbed()
			.setTitle('Guild information of ' + message.guild.name)
			.setThumbnail(message.guild.iconURL({ dynamic: true }))
			.addField('**❯ Owner -**', `${guildOwner.user.tag} (${message.guild.ownerId})`, false)
			.addField('**❯ Boost Tier -**', `${premiumTier[message.guild.premiumTier]}`, false)
			.addField('**❯ Boosts -**', `${message.guild.premiumSubscriptionCount || '0'}`, false)
			.addField('**❯ Explicit Tier -**', `${filterLevels[message.guild.explicitContentFilter]}`, false)
			.addField('**❯ Verification Level -**', `${verificationLevels[message.guild.verificationLevel]}`, false)
			.addField('**❯ Created at -**', `${moment(message.guild.createdTimestamp).format('LT')} ${moment(message.guild.createdTimestamp).format('LL')} | ${moment(message.guild.createdTimestamp).fromNow()}`, false)
			.addField('**❯ Total Roles -**', `${roles.length}`, false)
			.addField('**❯ Total Emojis -**', `${emojis.size}`, false)
			.addField('**❯ Regular Emojis -**', `${emojis.filter(emoji => !emoji.animated).size}`, false)
			.addField('**❯ Animated Emojis -**', `${emojis.filter(emoji => emoji.animated).size}`, false)
			.addField('**❯ Total Members -**', `${message.guild.memberCount.toLocaleString()}`, false)
			.addField('**❯ Humans -**', `${members.filter(member => !member.user.bot).size.toLocaleString()}`, false)
			.addField('**❯ Bots -**', `${members.filter(member => member.user.bot).size.toLocaleString()}`, false)
			.addField('**❯ Text Channels -**', `${message.guild.channels.cache.size}`, false)
			.setFooter(`ID: ${message.guild.id} | ${client.user.tag}`)
			.setTimestamp();

		message.channel.send({ embeds: [embed] });
	},
};