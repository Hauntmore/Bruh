const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	id: String,
	ticketsCreated: { type: Array, default: [] },
});

module.exports = mongoose.model('users', UserSchema);