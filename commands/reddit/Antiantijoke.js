const got = require('got');

module.exports = {
	name: 'antiantijoke',
	description: 'Send an anti anti joke Reddit post.',
	botPermissions: ['EMBED_LINKS', 'SEND_MESSAGES', 'VIEW_CHANNEL', 'READ_MESSAGE_HISTORY'],
	cooldown: 2,
	execute(message) {
		const { client } = message;
		got('https://www.reddit.com/r/AntiAntiJokes/random/.json').then(response => {
			const content = JSON.parse(response.body);
			const permalink = content[0].data.children[0].data.permalink;
			const embed = client.makeEmbed()
				.setTitle(content[0].data.children[0].data.title)
				.setURL(`https://reddit.com${permalink}`)
				.setDescription(content[0].data.children[0].data.selftext)
				.setFooter(`👍 ${content[0].data.children[0].data.ups} | 💬 ${content[0].data.children[0].data.num_comments}`)
				.setTimestamp();
			message.channel.send({ embeds: [embed] });
		});
	},
};