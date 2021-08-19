const { parse } = require('path');

module.exports = {
	name: 'require',
	aliases: ['import'],
	description: 'Refreshes the require cache of a file.',
	developer: true,
	args: true,
	execute(message, { args }) {
		const path = args[0];

		const resolved = require.resolve(path);
		const filename = parse(resolved).base;
		if (!filename.endsWith('.js') || !filename.endsWith('.json')) {return message.channel.send({ content: 'You can only require `.js` or `.json` files.' });}

		delete require.cache[resolved];
		message.channel.send({ content: `Refreshed \`${filename}\`.` });
	},
};