const { delay } = require('./Utils');

module.exports = {
	dad: {
		regex: /^(im|i['’]m|i am)\s+(.+)/i,
		parse: (match) => ({
			type: 'TEXT',
			content: `Hi ${match[2]}, I'm dad`,
		}),
	},
	sec: {
		regex: /^(one sec$|one second|sec$)/i,
		parse: () => delay(1000).then(() => ({
			type: 'TEXT',
			content: 'It\'s been one second',
		})),
	},
	ree: {
		regex: /^(ree)/i,
		parse: (match) => ({
			type: 'TEXT',
			content: `R${'E'.repeat(match.input.split(/ +g/)[0].length)}`,
		}),
	},
	nou: {
		regex: /^(no (?=u{1,}$))/i,
		parse: () => ({
			type: 'TEXT',
			content: 'no u',
		}),
	},
};