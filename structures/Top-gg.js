const express = require('express');
const TopGG = require('@top-gg/sdk');

const initialize = () => {
	const webhook = new TopGG.Webhook(process.env.TOPGGWEBHOOKAUTH);

	// Create the server.
	const app = express();

	app.get('/', (req, res) => res.send('Hello World!'));

	app.post('/webhook', webhook.listener((vote) => {
		console.log(`[Top.gg Webhook Vote] : ${vote}.`);
	}));

	app.listen(process.env.TOPGGAPPPORT, () => console.log(`[Express] The web server is now running on http://localhost:${process.env.TOPGGAPPPORT}.`));
};

module.exports.initialize = initialize;