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
	description: 'View information about the guild',
	async execute(interaction) {
		const { client } = interaction;

		const roles = interaction.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());

		const members = interaction.guild.members.cache;

		const emojis = interaction.guild.emojis.cache;

		const guildOwner = await interaction.guild.fetchOwner();

		const embed = client.makeEmbed()
			.setTitle('Guild information of ' + interaction.guild.name)
			.setThumbnail(interaction.guild.iconURL({ dynamic: true }))
			.addField('**❯ Owner -**', `${guildOwner.user.tag} (${interaction.guild.ownerId})`, false)
			.addField('**❯ Boost Tier -**', `${premiumTier[interaction.guild.premiumTier]}`, false)
			.addField('**❯ Boosts -**', `${interaction.guild.premiumSubscriptionCount || '0'}`, false)
			.addField('**❯ Explicit Tier -**', `${filterLevels[interaction.guild.explicitContentFilter]}`, false)
			.addField('**❯ Verification Level -**', `${verificationLevels[interaction.guild.verificationLevel]}`, false)
			.addField('**❯ Created at -**', `${moment(interaction.guild.createdTimestamp).format('LT')} ${moment(interaction.guild.createdTimestamp).format('LL')} | ${moment(interaction.guild.createdTimestamp).fromNow()}`, false)
			.addField('**❯ Total Roles -**', `${roles.length}`, false)
			.addField('**❯ Total Emojis -**', `${emojis.size}`, false)
			.addField('**❯ Regular Emojis -**', `${emojis.filter(emoji => !emoji.animated).size}`, false)
			.addField('**❯ Animated Emojis -**', `${emojis.filter(emoji => emoji.animated).size}`, false)
			.addField('**❯ Total Members -**', `${interaction.guild.memberCount.toLocaleString()}`, false)
			.addField('**❯ Humans -**', `${members.filter(member => !member.user.bot).size.toLocaleString()}`, false)
			.addField('**❯ Bots -**', `${members.filter(member => member.user.bot).size}`, false)
			.addField('**❯ Text Channels -**', `${interaction.guild.channels.cache.size}`, false)
			.setFooter(`ID: ${interaction.guild.id} | ${client.user.tag}`)
			.setTimestamp();

		await interaction.reply({ embeds: [embed] });
	},
};