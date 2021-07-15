const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	id: String,
	ticketsCreated: { type: Array, default: [] },
	afk: { type: Boolean, default: false },
	afkMessage: { type: String, default: 'null' },
	afkMessagesLeft: { type: Number, default: 10 },
});

module.exports = mongoose.model('users', UserSchema);