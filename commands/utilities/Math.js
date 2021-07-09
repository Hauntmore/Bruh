const { Parser } = require('expr-eval');

module.exports = {
	name: 'math',
	aliases: ['calc', 'solve', 'calculate'],
	description: 'Solve a math expression.',
	usage: '<expression>',
	example: ['calc 1+1', 'math 1/2'],
	botPermissions: ['VIEW_CHANNEL', 'EMBED_LINKS', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY'],
	execute(message, { content, flagsList, flags }) {
		const embed = message.client.makeEmbed();
		embed.setTitle('Math Evaluation');
		embed.addField('Input', `\`\`\`js\n${content}\n\`\`\``);
		if (flagsList.length) {
			embed.addField(
				`Variables [${flagsList.length}]`,
				Object.entries(flags).slice(0, 8).map(([k, v]) => `${k} = \`${v}\``),
			);
		}

		const parser = new Parser({ operators: { array: false } });
		try {
			const res = parser.evaluate(content, flags);
			embed.addField('Output', `\`\`\`js\n${res}\n\`\`\``);
			message.channel.send({ embeds: [embed] });
		} catch (err) {
			embed.addField('Output', `\`\`\`js\nError: ${err.message}\n\`\`\``);
			message.reply({ embeds: [embed] });
		}
	},
};