const { delay } = require('./Utils');
const emojiList = ['⏮', '◀️', '▶️', '⏭'];
const timeout = 120000;

module.exports = async (bot, channel, pages) => {
	let page = 0;
	const curPage = await channel.send({ embeds: [pages[page]] });

	for (const emoji of emojiList) {
		await curPage.react(emoji);
		await delay(750);
	}

	const filter = (reaction, user) => emojiList.includes(reaction.emoji.name) && !user.bot;
	const reactionCollector = await curPage.createReactionCollector(filter, { time: timeout });

	reactionCollector.on('collect', (reaction, user) => {
		if (!user.bot && channel.permissionsFor(bot.user).has('MANAGE_MESSAGES')) reaction.users.remove(user.id);
		switch (reaction.emoji.name) {
		case emojiList[0]:
			page = 0;
			break;
		case emojiList[1]:
			page = page > 0 ? --page : 0;
			break;
		case emojiList[2]:
			page = page + 1 < pages.length ? ++page : (pages.length - 1);
			break;
		case emojiList[3]:
			page = pages.length - 1;
			break;
		default:
			break;
		}
		curPage.edit({ embeds: [pages[page]] });
	});

	reactionCollector.on('end', () => curPage.reactions.removeAll());
	return curPage;
};