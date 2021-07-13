const Guild = require('../models/Guild');
const User = require('../models/User');
const Ticket = require('../models/Ticket');
const Tag = require('../models/Tags');

class DBFunctions {
	constructor() {
		throw new TypeError('DBFunctions is a static class and cannot be instantiated.');
	}

	// Guild database functions.

	static async guildDB(guildID) {
		if (!guildID) throw new TypeError('A guild ID was not specified.');

		const guild = await Guild.findOne({ id: guildID });

		if (!guild) {
			const newGuild = await new Guild({ id: guildID });

			const prefixes = newGuild.prefixes;
			const autoResponse = newGuild.autoResponse;
			const premium = newGuild.premium;
			const messageLogsChannel = newGuild.messageLogsChannel;
			const joinLogsChannel = newGuild.joinLogsChannel;
			const joinLogsMessage = newGuild.joinLogsMessage;
			const disabledCommands = newGuild.disabledCommands;

			await newGuild.save().catch(err => console.log(err));
			return { prefixes, autoResponse, premium, messageLogsChannel, joinLogsChannel, joinLogsMessage, disabledCommands };
		} else {
			const prefixes = guild.prefixes;
			const autoResponse = guild.autoResponse;
			const premium = guild.premium;
			const messageLogsChannel = guild.messageLogsChannel;
			const joinLogsChannel = guild.joinLogsChannel;
			const joinLogsMessage = guild.joinLogsMessage;
			const disabledCommands = guild.disabledCommands;

			return { prefixes, autoResponse, premium, messageLogsChannel, joinLogsChannel, joinLogsMessage, disabledCommands };
		}
	}

	static async guildWelcomeChannel(guildID, channel) {
		if (!guildID) throw new TypeError('A guild ID was not specified.');
		if (!channel) throw new TypeError('A channel was not specified.');

		const guild = await Guild.findOne({ id: guildID });

		if (!guild) {
			const newGuild = new Guild({ id: guildID });

			newGuild.joinLogsChannel = channel;

			await newGuild.save().catch(err => console.log(err));
			return { channel };
		} else {
			guild.joinLogsChannel = channel;

			await guild.save().catch(err => console.log(err));
			return { channel };
		}
	}

	static async guildWelcomeMessage(guildID, content) {
		if (!guildID) throw new TypeError('A guild ID was not specified.');
		if (!content) throw new TypeError('A user entry message was not specified.');

		const guild = await Guild.findOne({ id: guildID });

		if (!guild) {
			const newGuild = new Guild({ id: guildID });

			newGuild.joinLogsMessage = content;

			await newGuild.save().catch(err => console.log(err));
			return { content };
		} else {
			guild.joinLogsMessage = content;

			await guild.save().catch(err => console.log(err));
			return { content };
		}
	}

	static async guildMessagelogsChannel(guildID, channel) {
		if (!guildID) throw new TypeError('A guild ID was not specified.');
		if (!channel) throw new TypeError('A channel was not specified.');

		const guild = await Guild.findOne({ id: guildID });

		if (!guild) {
			const newGuild = new Guild({ id: guildID });

			newGuild.messageLogsChannel = channel;

			await newGuild.save().catch(err => console.log(err));
			return { channel };
		} else {
			guild.messageLogsChannel = channel;

			await guild.save().catch(err => console.log(err));
			return { channel };
		}
	}

	static async guildAutoresponse(guildID, toggle) {
		if (!guildID) throw new TypeError('A guild ID was not specified.');
		if (!toggle) throw new TypeError('A toggle was not specified.');

		const guild = await Guild.findOne({ id: guildID });

		if (!guild) {
			const newGuild = new Guild({ id: guildID });

			if (toggle == 'true') {
				newGuild.autoResponse = true;
			} else {
				newGuild.autoResponse = false;
			}

			await newGuild.save().catch(err => console.log(err));
			return { toggle };
		} else {
			if (toggle == 'true') {
				guild.autoResponse = true;
			} else {
				guild.autoResponse = false;
			}

			await guild.save().catch(err => console.log(err));
			return { toggle };
		}
	}

	static async guildDelete(guildID) {
		if (!guildID) throw new TypeError('A guild ID was not specified.');

		const guild = await Guild.findOne({ id: guildID });
		if (!guild) {
			return;
		} else {
			return await guild.deleteOne({ id: guildID }).catch(err => console.log(err));
		}
	}

	static async guildPremium(guildID, toggle) {
		if (!guildID) throw new TypeError('A guild ID was not specified.');
		if (!toggle) throw new TypeError('A toggle was not specified.');

		const guild = await Guild.findOne({ id: guildID });

		if (!guild) {
			const newGuild = new Guild({ id: guildID });
			if (toggle == 'true') {
				newGuild.premium = true;
			} else {
				newGuild.premium = false;
			}

			await newGuild.save().catch(error => console.log(error));
			return { toggle };
		} else {
			if (toggle == 'true') {
				guild.premium = true;
			} else {
				guild.premium = false;
			}

			await guild.save().catch(error => console.log(error));
			return { toggle };
		}
	}

	// User database functions.

	static async userDB(userID) {
		if (!userID) throw new TypeError('A user ID was not specified.');

		const user = await User.findOne({ id: userID });

		if (!user) {
			const newUser = await new User({ id: userID });

			const ticketsCreated = newUser.ticketsCreated;

			await newUser.save().catch(err => console.log(err));
			return { ticketsCreated };
		} else {
			const ticketsCreated = user.ticketsCreated;

			return { ticketsCreated };
		}
	}

	// Ticket database functions

	static async addUserTicketsCreated(userID, ticketId) {
		if (!userID) throw new TypeError('A user ID was not specified.');
		if (!ticketId) throw new TypeError('A ticket ID was not specified.');

		const user = await User.findOne({ id: userID });

		if (!user) {
			const newUser = new User({ id: userID });

			newUser.ticketsCreated.push(ticketId);

			await newUser.save().catch(err => console.log(err));
			return { ticketId };
		} else {
			user.ticketsCreated.push(ticketId);

			await user.save().catch(err => console.log(err));
			return { ticketId };
		}
	}

	static async createUserTicket(userID, ticketContent, ticketID) {
		if (!userID) throw new TypeError('A user ID was not specified.');
		if (!ticketContent) throw new TypeError('The ticket was not specified.');
		if (!ticketID) throw new TypeError('A ticket ID was not specified.');

		const ticket = await new Ticket({
			id: userID,
			ticketContent: ticketContent,
			ticketID: ticketID,
		});

		await ticket.save().catch(err => console.log(err));
		return { ticketContent, ticketID };
	}

	static async createGuildTag(guildID, cmd, response) {
		if (!guildID) throw new TypeError('A guild ID was not specified.');
		if (!cmd) throw new TypeError('A tag name was not specified.');
		if (!response) throw new TypeError('The tag response was not specified.');

		const tag = await new Tag({
			id: guildID,
			cmd: cmd,
			response: response,
		});

		await tag.save().catch(err => console.log(err));
		return { cmd, response };
	}

	static async deleteGuildTag(guildID, cmd) {
		if (!guildID) throw new TypeError('A guild ID was not specified.');
		if (!cmd) throw new TypeError('A tag name was not specified.');

		const tag = await Tag.findOne({ cmd: cmd });
		if (!tag) {
			return;
		} else {
			await tag.deleteOne();
		}
		return { cmd };
	}
}

module.exports = DBFunctions;