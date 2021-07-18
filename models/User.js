const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	id: String,
	ticketsCreated: { type: Array, default: [] },
	premium: { type: Boolean, default: false },
});

module.exports = mongoose.model('users', UserSchema);