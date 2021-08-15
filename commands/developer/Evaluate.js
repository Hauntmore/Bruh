/* eslint-disable no-unused-vars */
const { MessageEmbed, MessageAttachment } = require('discord.js');
const { timeit, parseCode, typeName } = require('../../core/Utils');

module.exports = {
	name: 'evaluate',
	aliases: ['run', 'exec', 'eval'],
	description: 'Evaluate code inside Discord.',
	usage: '<code>',
	example: ['eval message.channel.send("halp me");', 'eval message.guild.id'],
	botPermissions: ['EMBED_LINKS', 'SEND_MESSAGES', 'VIEW_CHANNEL', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY'],
	developer: true,
	args: true,
	async execute(message, { raw }) {
		try {
			const { client, channel, guild, author, member } = message;

			const utils = require('../../core/Utils');

			const msg = message;
			const bot = client;

			let code = client.utils.parseCode(raw);
			code = code.includes('await')
				? `(async () => { ${code} })();`
				: code;
			// eslint-disable-next-line prefer-const
			let { time, result: evaled } = await client.utils.timeit(() => eval(code));

			const type = typeof evaled === 'undefined'
				? 'undefined' : evaled.constructor;
			const formatted = `Time: \`${time.toFixed(3)} ms\` • Type: \`${type.name || 'undefined'}\``;

			if (type === MessageEmbed || type === MessageAttachment) {return message.channel.send({ content: `${formatted, evaled}` });} else if (typeof evaled !== 'string') {evaled = require('util').inspect(evaled);}

			if (evaled.length > 1900) {
				const result = new MessageAttachment(Buffer.from(evaled), 'result.js');
				message.channel.send({ content: formatted, files: [result] });
			} else {message.channel.send({ content: `${formatted}, \`\`\`js\n${evaled}\`\`\`` });}
		} catch (err) {
			const error = clean(err);
			if (err.length > 1900) {
				const result = new MessageAttachment(Buffer.from(error), 'error.js');
				message.reply({ content: '**An error has occured:**', files: [result] });
			} else {message.reply({ content: `**An error has occured:**\n\`\`\`js\n${error}\`\`\`` });}
			throw err;
		}
	},
};

const clean = text => {
	if (typeof (text) === 'string') {return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203));} else {return text;}
};
