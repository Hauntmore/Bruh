const mongoose = require('mongoose');

const GuildSchema = new mongoose.Schema({
	id: String,
	prefixes: { type: Array, default: ['bruh'] },
	autoResponse: { type: Boolean, default: false },
	premium: { type: Boolean, default: false },
	messageLogsChannel: { type: String, default: 'null' },
	joinLogsChannel: { type: String, default: 'null' },
	joinLogsMessage: { type: String, default: 'null' },
});

module.exports = mongoose.model('guilds', GuildSchema);