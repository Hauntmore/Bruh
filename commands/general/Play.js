module.exports = {
	name: 'play',
	description: 'Play music.',
	usage: '<song>',
	example: ['play Rick Roll', 'play Faded'],
	botPermissions: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'EMBED_LINKS', 'READ_MESSAGE_HISTORY', 'CONNECT', 'SPEAK'],
	cooldown: 3,
	async execute(message, { args }) {
		const { client } = message;

		const res = await client.manager.search(
			args.slice(0).join(' '),
			message.author,
		);

		const player = client.manager.create({
			guild: message.guild.id,
			voiceChannel: message.member.voice.channel.id,
			textChannel: message.channel.id,
		});

		player.connect();

		player.queue.add(res.tracks[0]);
		message.channel.send(`This just got added to the queue: ${res.tracks[0].title}.`);

		if (!player.playing && !player.paused && !player.queue.size) {
			player.play();
		}

		if (!player.playing && !player.paused && player.queue.totalSize === res.tracks.length) {
			player.play();
		}
	},
};