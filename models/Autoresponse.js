const mongoose = require('mongoose');

const ARSchema = new mongoose.Schema({
	id: String,
	trigger: { type: String, required: true },
	content: { type: String, required: true },
});

module.exports = mongoose.model('ars', ARSchema);
