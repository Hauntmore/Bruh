module.exports = {
	name: 'clap',
	description: 'Clap something.',
	usage: '<text>',
	example: ['clap Happy birthday to you', 'clap yay im so cool'],
	botPermissions: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'READ_MESSAGE_HISTORY'],
	args: true,
	cooldown: 2,
	execute(message, { args }) {
		const clap = args.slice(0).join(' ').split(' ').join(' :clap: ');

		if (clap.length < 1) return message.channel.send({ content: 'Please input text.' });
		if (clap.length > 600) return message.channel.send({ content: 'Please keep the text below 600 Characters.' });

		message.channel.send({ content: `:clap: ${clap} :clap:` });
	},
};