class slots {
	/**
     * @name slots
     * @kind constructor
     * @param {Object} options options
     * @param {any} [options.message] The discord message
     * @param {String} [options.winMessage] The win message
     * @param {String} [options.loseMessage] The lose message
     * @param {String} [options.emojiOne] For emoji one
     * @param {String} [options.emojiTwo] For emoji two
     * @param {String} [options.emojiThree] For emoji three
     */
	constructor(options) {
		if(!options.message) throw new TypeError('Missing argument message.');
		if(!options.winMessage) throw new TypeError('Missing argument winMessage.');
		if(!options.loseMessage) throw new TypeError('Missing argument loseMessage.');
		if(!options.emojiOne) throw new TypeError('Missing argument emojiOne.');
		if(!options.emojiTwo) throw new TypeError('Missing argument emojiTwo.');

		if(typeof options.winMessage !== 'string') throw new TypeError('winMessage must be a string.');
		if(typeof options.loseMessage !== 'string') throw new TypeError('loseMessage must be a string.');
		if(typeof options.emojiOne !== 'string') throw new TypeError('emojiOne must be a string.');
		if(typeof options.emojiTwo !== 'string') throw new TypeError('emojiTwo must be a string.');
		if(typeof options.emojiThree !== 'string') throw new TypeError('emojiThree must be a string.');

		this.message = options.message;
		this.winMessage = options.winMessage;
		this.loseMessage = options.loseMessage;
		this.emojiOne = options.emojiOne;
		this.emojiTwo = options.emojiTwo;
		this.emojiThree = options.emojiThree;
	}

	async start() {
		const slots = [this.emojiOne, this.emojiTwo, this.emojiThree];

		const slotOne = slots[Math.floor(Math.random() * slots.length)];
		const slotTwo = slots[Math.floor(Math.random() * slots.length)];
		const slotThree = slots[Math.floor(Math.random() * slots.length)];

		if(slotOne === slotTwo && slotOne === slotThree) {
			this.message.channel.send(`**>** ${slotOne} | ${slotTwo} | ${slotThree} **<**\n${this.winMessage}`);
		} else {
			this.message.channel.send(`**>** ${slotOne} | ${slotTwo} | ${slotThree} **<**\n${this.loseMessage}`);
		}
	}
}

module.exports = slots;