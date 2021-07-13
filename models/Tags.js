const mongoose = require('mongoose');

const TagSchema = new mongoose.Schema({
	id: String,
	cmd: { type: String },
	response: { type: String },
});

module.exports = mongoose.model('tags', TagSchema);