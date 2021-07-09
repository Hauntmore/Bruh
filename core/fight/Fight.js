/* eslint-disable no-useless-escape */
class Fight {
	/**
     * @name fight
     * @kind constructor
     * @param {Object} options options
     * @param {String} [options.acceptMessage] message sent when user trying to fight opponent
     * @param {any} [options.message] message
     * @param {any} [options.client] client
     * @param {any} [options.challenger] challenger
     * @param {any} [options.opponent] opponent
     */
	constructor(options) {
		if (!options.acceptMessage) throw new TypeError('Missing Argument: acceptMessage.');
		if (typeof options.acceptMessage !== 'string') throw new TypeError('The accept message must be a string.');
		if (!options.message) throw new TypeError('Missing Argument: message.');
		if (!options.client) throw new TypeError('Missing Argument: client.');
		if (!options.challenger) throw new TypeError('Missing Argument: challenger.');
		if (!options.opponent) throw new TypeError('Missing Argument: opponent.');
		this.message = options.message;
		this.acceptMessage = options.acceptMessage;
		this.client = options.client;
		this.challenger = options.challenger;
		this.opponent = options.opponent;
	}
	async start() {
		const challenger = this.challenger;
		const oppenent = this.opponent;
		const question = await this.message.channel.send({ content: this.acceptMessage });

		['✅', '❌'].forEach(async el => await question.react(el));

		const filter = (reaction, user) => ['✅', '❌'].includes(reaction.emoji.name) && user.id === this.opponent.id;

		const response = await question.awaitReactions(filter, { max: 1, time: 60000 });
		const reaction = response.first();
		if (oppenent.bot) return this.message.channel.send({ content: 'Last time I checked, You can\'t fight bots.' });
		if (oppenent.id === challenger.id) return this.message.channel.send({ content: 'Are you that drunk, thinking you can fight yourself?' });
		if (reaction.emoji.name === '❌') { return question.edit({ content: 'The fight has been canceled.' }); } else {
			const challengerHealth = 100;
			const oppenentHealth = 100;

			const challengerLastAttack = 'heal';
			const oppenentLastAttack = 'heal';

			const gameData = [
				{ member: challenger, health: challengerHealth, lastAttack: challengerLastAttack },
				{ member: oppenent, health: oppenentHealth, lastAttack: oppenentLastAttack },
			];

			let player = 0;

			const checkHealth = (member) => {
				if (gameData[member].health <= 0) return true;
				else return false;
			};

			await this.message.channel.send({ content: `${challenger}, You Go First\nPlease Choose: \`attack\`, \`heal\`, \`hp\`, \`cancel\`.` });
			const gameFilter = m => m.author.id === challenger.id || m.author.id === oppenent.id;
			const gameCollector = this.message.channel.createMessageCollector(gameFilter);

			gameCollector.on('collect', msg => {
				if (msg.author.id === gameData[player].member.id) {
					if (!checkHealth(player)) {
						const selection = msg.content.toLowerCase();
						if (selection !== 'attack' && selection !== 'heal' && selection !== 'cancel' && selection !== 'hp') {
							return this.message.channel.send({ content: 'That is not a valid option!\nPlease choose one of the following instead: \`attack\`, \`heal\`, \`hp\`, \`cancel\`.' });
						}

						if (selection === 'attack') {
							let randNumb = Math.floor(Math.random() * (60 - 12) + 12);
							const tempPlayer = (player + 1) % 2;
							if (gameData[tempPlayer].lastAttack === 'heal') randNumb = Math.floor(randNumb / 2);
							gameData[tempPlayer].health -= randNumb;
							gameData[player].lastAttack = 'attack';
							this.message.channel.send({ content: `${gameData[player].member} — ${gameData[player].health} HP, has attacked you and dealt **${randNumb} points of damage**.` });
							this.message.channel.send({ content: `${gameData[tempPlayer].member} — ${gameData[tempPlayer].health} HP, please choose: \`attack\`, \`heal\`, \`hp\`, \`cancel\`.` });
							player = (player + 1) % 2;
						} else if (selection === 'heal') {
							let randrNumb = Math.floor(Math.random() * (20 - 12) + 12);
							const tempPlayer = (player + 1) % 2;
							if (gameData[tempPlayer].lastAttack === 'heal') randrNumb = Math.floor(randrNumb / 2);
							gameData[player].health += randrNumb;
							gameData[player].lastAttack = 'attack';
							this.message.channel.send({ content: `${gameData[player].member} — ${gameData[player].health} HP, has healed themselves and got back **${randrNumb}** points of HP.` });
							this.message.channel.send({ content: `${gameData[tempPlayer].member} — ${gameData[tempPlayer].health} HP, please choose: \`attack\`, \`heal\`, \`hp\`, \`cancel\`.` });
							player = (player + 1) % 2;
						} else if (selection === 'cancel') {
							gameCollector.stop();
							this.message.reply({ content: 'Game stopped.' });
						} else if (selection === 'hp') {
							this.message.channel.send({ content: `${gameData[player].health} is your current HP count.\nNow, please choose: \`attack\`, \`heal\`, \`hp\`, \`cancel\`.` });
						}

						if (checkHealth(player)) {
							gameCollector.stop();
							const tempPlayer = (player + 1) % 2;
							this.message.channel.send({ content: `🏆 ${gameData[tempPlayer].member} has won the game!` });
						}
					} else {
						this.message.channel.send({ content: `🏆 ${gameData[player].member} has won the game!` });
					}
				}
			});
		}
	}
}

module.exports = Fight;