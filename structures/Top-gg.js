const express = require('express');
const TopGG = require('@top-gg/sdk');

const initialize = () => {
	const webhook = new TopGG.Webhook(process.env.TOPGGWEBHOOKAUTH);

	// Create the server.
	const app = express();

	app.post('/dblwebhook', webhook.listener((vote) => {
		console.log(`[DBL Webhook Vote] : ${vote.user}.`);
	}));

	app.listen(process.env.TOPGGAPPPORT, () => console.log('[Express] The web server is now running.'));
};

module.exports.initialize = initialize;