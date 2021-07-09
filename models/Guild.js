const mongoose = require('mongoose');

const GuildSchema = new mongoose.Schema({
	id: String,
	prefixes: { type: Array, default: ['bruh'] },
	autoResponse: { type: Boolean, default: false },
	blacklisted: { type: Boolean, default: false },
});

module.exports = mongoose.model('guilds', GuildSchema);