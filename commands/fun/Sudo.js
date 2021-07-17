const Sudo = require('../../core/sudo/Sudo');

module.exports = {
	name: 'sudo',
	aliases: ['copycat'],
	usage: '<member> <text>',
	description: 'This command will allow you to copycat someone.',
	example: 'sudo @Hauntless#3212 Hi, I\'m so sus.',
	args: true,
	botPermissions: ['MANAGE_WEBHOOKS', 'SEND_MESSAGES'],
	premiumUserOnly: true,
	cooldown: 3,
	execute(message, { args }) {
		const member = message.mentions.members.last() || message.guild.members.cache.get(args[0]);
		if (!member) return message.channel.send({ content: 'This member does not exist within this guild.' });

		const msg = args.slice(1).join(' ');

		if (!msg) return message.channel.send({ content: 'You need to add some text for the sudo!' });
		const SudoGame = new Sudo({ message: message, text: msg, member: member });

		SudoGame.start();
	},
};