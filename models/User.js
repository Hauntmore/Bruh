const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	id: String,
	ticketsCreated: { type: Array, default: [] },
	blacklisted: { type: Boolean, default: false },
});

module.exports = mongoose.model('users', UserSchema);