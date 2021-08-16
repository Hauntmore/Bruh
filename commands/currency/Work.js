const { MessageEmbed } = require('discord.js');
const jobs = ['Programmer', 'Chef', 'Bank Teller', 'Mechanic', 'Private Cook', 'Police Officer', 'Bus-Boy', 'Discord Moderator', 'Bot Moderator', 'Fornite Streamer', 'Professional Apex Legends Player', 'Mechanic', 'Construction Worker', 'Waiter', 'Taxi Driver'];

module.exports = {
	name: 'work',
	aliases: ['job'],
	description: 'Work and earn a check.',
	botPermissions: ['EMBED_LINKS', 'SEND_MESSAGES', 'VIEW_CHANNEL', 'READ_MESSAGE_HISTORY'],
	cooldown: 3600,
	async execute(message) {
		const { client } = message;

		const job = Math.floor((Math.random() * jobs.length));
		const coinsGiven = Math.floor(Math.random() * 5000) + 70;

		const embed = new MessageEmbed()
			.setTitle(`${message.author.username}'s Work Summary`)
			.setDescription(`You worked as: A ${job}\nAmount Paid: $${coinsGiven}`)
			.setFooter('💰')
			.setTimestamp()
			.setColor('BLUE');

		message.channel.send({ embeds: [embed] });
		await client.db.addWallet(message.author.id, coinsGiven);
	},
};