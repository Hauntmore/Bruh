const got = require('got');

module.exports = {
	name: 'joke',
	description: 'Send a random joke from Reddit.',
	botPermissions: ['EMBED_LINKS', 'SEND_MESSAGES', 'VIEW_CHANNEL', 'READ_MESSAGE_HISTORY'],
	cooldown: 2,
	execute(message) {
		const { client } = message;
		got('https://www.reddit.com/r/Jokes/random/.json').then(response => {
			const content = JSON.parse(response.body);
			const permalink = content[0].data.children[0].data.permalink;
			const url = `https://reddit.com${permalink}`;
			const text = content[0].data.children[0].data.selftext;
			const title = content[0].data.children[0].data.title;
			const upvotes = content[0].data.children[0].data.ups;
			const comments = content[0].data.children[0].data.num_comments;
			const embed = client.makeEmbed()
				.setTitle(title)
				.setURL(url)
				.setDescription(text)
				.setFooter(`👍 ${upvotes} | 💬 ${comments}`)
				.setTimestamp();
			message.channel.send({ embeds: [embed] });
		});
	},
};