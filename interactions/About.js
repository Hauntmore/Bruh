module.exports = {
	name: 'about',
	description: 'Look at the about information of the bot.',
	async execute(interaction) {
		const embed = interaction.client.makeEmbed()
			.setTitle('About the bot')
			.setDescription('<a:h_pepeclap:860614973729538048> This bot is inspired by [Bro](https://discordapp.com/oauth2/authorize?client_id=543624467398524935&scope=bot&permissions=2146958591).\nThe bot is constantly being worked on, and new features are being made frequently!\n\nYou can join the small and very messy testing server for the bot [here](https://discord.gg/gE6KcBHRqE) <:h_pepesadsit:860712587141971968>.')
			.addField('**❯ Bot Developers -**', '<@!679867543066116169> <:h_mmLol:862736738136096788>\n<@!749732650209640529> <:h_foilpepe:826676615790198824>', false)
			.addField('**❯ Shout outs -**', '<@!266432078222983169> <:h_goawaydaunt:863158001074831371>\n<@!673612822495756354> <:h_mikeprincess:817568904914010153>', false)
			.addField('**❯ #1 Bug Hunter -**', '<@!663688880662249503> <:h_angryPupLove:839190655040356453>', false)
			// .addField('**❯ Bot Moderators -**', `${interaction.client.config.botmoderators.join('\n')}`, false)
			.setTimestamp();

		await interaction.reply({ embeds: [embed] });
	},
};