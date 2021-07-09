const got = require('got');

module.exports = {
	name: 'prequel',
	description: 'Send prequel memes from Reddit.',
	botPermissions: ['EMBED_LINKS', 'SEND_MESSAGES', 'VIEW_CHANNEL', 'READ_MESSAGE_HISTORY'],
	cooldown: 2,
	execute(message) {
		const { client } = message;
		got('https://www.reddit.com/r/PrequelMemes/random/.json').then(response => {
			const content = JSON.parse(response.body);
			const permalink = content[0].data.children[0].data.permalink;
			const embed = client.makeEmbed()
				.setTitle(content[0].data.children[0].data.title)
				.setURL(`https://reddit.com${permalink}`)
				.setImage(content[0].data.children[0].data.url)
				.setFooter(`👍 ${content[0].data.children[0].data.ups} | 💬 ${content[0].data.children[0].data.num_comments}`)
				.setTimestamp();
			message.channel.send({ embeds: [embed] });
		});
	},
};