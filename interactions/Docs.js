const fetch = require('node-fetch');

module.exports = {
	name: 'docs',
	description: 'Search the official Discord.js documentation.',
	options: [{
		name: 'query',
		type: 3,
		description: 'The query to search for in the docs.',
		required: true,
	}],
	async execute(interaction) {
		let embed = await fetch(`https://djsdocs.sorta.moe/v2/embed?src=master&q=${encodeURIComponent(interaction.options.getString('query', true))}`);
		embed = await embed.json();
		embed['color'] = 0x5865F2;

		try {
			await interaction.reply({ embeds: [embed] });
		} catch (err) {
			console.error(err);
			await interaction.reply({ content: 'This command has failed. Please try again!', ephemeral: true });
		}
	},
};