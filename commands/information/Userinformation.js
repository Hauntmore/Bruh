const { MessageEmbed } = require('discord.js');
const flags = {
	DISCORD_EMPLOYEE: 'Discord Employee',
	DISCORD_PARTNER: 'Discord Partner',
	BUGHUNTER_LEVEL_1: 'Bug Hunter (Level 1)',
	BUGHUNTER_LEVEL_2: 'Bug Hunter (Level 2)',
	HYPESQUAD_EVENTS: 'HypeSquad Events',
	HOUSE_BRAVERY: 'House of Bravery',
	HOUSE_BRILLIANCE: 'House of Brilliance',
	HOUSE_BALANCE: 'House of Balance',
	EARLY_SUPPORTER: 'Early Supporter',
	TEAM_USER: 'Team User',
	SYSTEM: 'System',
	VERIFIED_BOT: 'Verified Bot',
	VERIFIED_DEVELOPER: 'Verified Bot Developer',
};
const presences = {
	online: 'Online',
	dnd: 'Do Not Disturb',
	idle: 'Idle',
	offline: 'Offline',
};

module.exports = {
	name: 'userinformation',
	aliases: ['userinfo', 'whois', 'wi', 'ui'],
	description: 'Send statistics about a user.',
	usage: '[member]',
	example: ['userinformation @Hauntless#3212', 'whois 749732650209640529'],
	botPermissions: ['SEND_MESSAGES', 'EMBED_LINKS', 'VIEW_CHANNEL', 'READ_MESSAGE_HISTORY'],
	cooldown: 2,
	execute(message, { args }) {
		const { client } = message;

		const member = message.mentions.members.last() || message.guild.members.cache.get(args[0]) || message.member;
		const userFlags = member.user.flags.toArray();
		const presence = presences[member.presence?.status] ?? 'Offline';

		const embed = new MessageEmbed()
			.setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
			.setColor(member.displayHexColor || 'RANDOM')
			.setTimestamp()
			.setFooter(`ID: ${member.id}`)
			.addField('**❯ Username -**', `${member.user.tag}`, false)
			.addField('**❯ Badges -**', `${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'None'}`, false)
			.addField('**❯ Created at -**', `${member.user.createdAt.toUTCString().substr(0, 16)}`, false)
			.addField('**❯ Joined at -**', `${member.joinedAt.toUTCString().substr(0, 16)}`, false)
			.addField('**❯ Bot -**', `${client.utils.checkOrCross(member.user.bot)}`, false)
			.addField('**❯ Nickname -**', `${member.nickname ? member.nickname : 'No nickname.'}`, false)
			.addField('**❯ Hoisted Role -**', `${member.roles.hoist ? member.roles.hoist.name : 'None'}`, false)
			.addField('**❯ User Presence -**', `${presence}`, false)
			.addField('**❯ Permissions -**', `${member.permissions.toArray().map(p => client.utils.formatPerm(p)).join(', ').title()}`);

		message.channel.send({ embeds: [embed] });
	},
};