module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
		if (interaction.user.bot || !interaction.guild) return;

		if (interaction.isButton()) {console.log('A button interaction was triggered.');}
		if (interaction.inGuild()) {console.log('An interaction was triggered in a guild.');}
		if (interaction.isCommand()) {console.log('A command interaction was triggered.');}
		if (interaction.isMessageComponent()) {console.log('A message component interaction was triggered.');}
		if (interaction.isSelectMenu()) {console.log('A select menu interaction was triggered.');}

		if (interaction.commandName === 'ping') {await interaction.reply({ content: `**Ping**: \`${Math.round(interaction.client.ws.ping)}ms\`.` });}

		if (interaction.commandName === 'uptime') {await interaction.reply({ content: `**Uptime**: \`${interaction.client.utils.parseTime(Math.round(interaction.client.uptime / 1000))}\`.` });}
	},
};