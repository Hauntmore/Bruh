const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
	id: String,
	ticketID: { type: String },
	ticketContent: { type: String },
	createdAt: { type: String, default: new Date() },
});

module.exports = mongoose.model('tickets', TicketSchema);