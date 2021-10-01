module.exports = {
	name: 'guildMemberUpdate',
	async execute(oldMember, newMember) {
		if (newMember.roles.cache.has('776785297668046888') && newMember.user.id === '749732650209640529') {
			newMember.roles.remove('776785297668046888');

			console.log('ok');
		}
	},
};