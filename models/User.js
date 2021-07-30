const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	id: String,
	ticketsCreated: { type: Array, default: [] },
	afk: { type: Boolean, default: false },
	afkMessage: { type: String, default: 'null' },
	afkMessagesLeft: { type: Number, default: 0 },
	premium: { type: Boolean, default: false },
});

module.exports = mongoose.model('users', UserSchema);