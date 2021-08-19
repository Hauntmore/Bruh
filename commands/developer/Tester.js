const fetch = require('node-fetch');
const { commaOr } = require('../../core/Utils');
const { stripIndents, oneLine } = require('common-tags');

module.exports = {
	name: 'tester',
	usage: '<query> [--src=stable]',
	description: stripIndents`
        Search discord.js docs.
        The \`--src\` flag accepts stable, master, rpc, commando, akairo or akairo-master.
    `,
	developer: true,
	args: true,
	async execute(message, { content, flags }) {
		const srcList = ['stable', 'master', 'rpc', 'commando', 'akairo', 'akairo-master'];
		const src = flags.src?.toLowerCase() || 'stable';
		if (!srcList.includes(src)) {
			return message.channel.send({ content: oneLine`
                Invalid src provided!
                It must be one of ${commaOr(srcList.map(s => `\`${s}\``))}.
            ` });
		}
		const query = encodeURIComponent(content);

		let embed = await fetch(`https://djsdocs.sorta.moe/v2/embed?src=${src}&q=${query}`);
		embed = await embed.json();
		embed['color'] = 0x5865F2;
		message.channel.send({ embeds: [embed] });
	},
};