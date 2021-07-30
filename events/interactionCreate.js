const Discord = require('discord.js');

module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
		if (interaction.user.bot || !interaction.guild) return;

		if (interaction.isButton()) {console.log('A button interaction was triggered.');}
		if (interaction.inGuild()) {console.log('An interaction was triggered in a guild.');}
		if (interaction.isCommand()) {console.log('A command interaction was triggered.');}
		if (interaction.isMessageComponent()) {console.log('A message component interaction was triggered.');}
		if (interaction.isSelectMenu()) {console.log('A select menu interaction was triggered.');}

		if (interaction.commandName === 'ping') {
			await interaction.reply({ content: `**Discord API Websocket Ping**: \`${Math.round(interaction.client.ws.ping)}ms\`.\n**Interaction Latency**: \`${Date.now() - interaction.createdTimestamp}ms\`.` });
		}

		if (interaction.commandName === 'uptime') {
			await interaction.reply({ content: `**Uptime**: \`${interaction.client.utils.parseTime(Math.round(interaction.client.uptime / 1000))}\`.` });
		}

		if (interaction.commandName === 'invite') {
			const ButtonRow = new Discord.MessageActionRow()
				.addComponents(new Discord.MessageButton().setURL(interaction.client.config.botinvite).setLabel('Invite me!').setStyle('LINK'));

			const embed = interaction.client.makeEmbed()
				.setTitle(interaction.client.user.username)
				.setURL(interaction.client.user.displayAvatarURL())
				.setThumbnail(interaction.client.user.displayAvatarURL({ dynamic: true, format: 'png' }))
				.setTimestamp()
				.setDescription(`We appreciate you for inviting ${interaction.client.user.username}! Thank you for supporting the bot development!\n\n**Click on the button to invite the bot!**`)
				.setFooter(`Total Servers: ${interaction.client.guilds.cache.size.toLocaleString()}`);

			await interaction.reply({ embeds: [embed], components: [ButtonRow] });
		}

		if (interaction.commandName === 'echo') {
			await interaction.reply({ content: `${interaction.options.getString('input', true)}\n\n- **${interaction.user.tag}**` });
		}

		if (interaction.commandName === 'asktrump') {
			const { trumpPhotos, trumpResponses } = require('../../lib/json/trump.json');

			const embed = interaction.client.makeEmbed()
				.setDescription(`\n${interaction.user.username}: ${interaction.options.getString('input', true)}\n\nDonald Trump: ${trumpResponses[Math.floor(Math.random() * trumpResponses.length)].toUpperCase()}`)
				.setThumbnail(trumpPhotos[Math.floor(Math.random() * trumpPhotos.length)])
				.setTimestamp();

			await interaction.reply({ embeds: [embed] });
		}

		if (interaction.commandName === '8ball') {
			const responses = ['As I see it, yes.', 'Ask again later.', 'Better not tell you now.', 'Cannot predict now.', 'Concentrate and ask again.',
				'Don’t count on it.', 'It is certain.', 'It is decidedly so.', 'Most likely.', 'My reply is no.', 'My sources say no.',
				'Outlook not so good.', 'Outlook good.', 'Reply hazy, try again.', 'Signs point to yes.', 'Very doubtful.', 'Without a doubt.',
				'Yes.', 'Yes – definitely.', 'You may rely on it.'];

			const answer = Math.floor(Math.random() * responses.length);

			const embed = interaction.client.makeEmbed()
				.setTitle('8ball')
				.setDescription(`🎱 | Question: ${interaction.options.getString('input', true)}\n\n💬 | Answer: ${responses[answer]}`)
				.setTimestamp();

			await interaction.reply({ embeds: [embed] });
		}
	},
};