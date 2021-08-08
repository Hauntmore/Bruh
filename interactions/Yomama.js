const fetch = require('node-fetch');

module.exports = {
	name: 'yomama',
	description: 'Insult a member with a yo mama joke.',
	options: [{
		name: 'member',
		type: 6,
		description: 'The member to yo mama.',
		required: true,
	}],
	async execute(interaction) {
		const member = interaction.options.getMember('member', true);

		const { joke } = await fetch('http://api.yomomma.info').then((res) => res.json());

		const embed = interaction.client.makeEmbed()
			.setDescription(`${member}, ${joke}.`);

		await interaction.reply({ embeds: [embed] });
	},
};