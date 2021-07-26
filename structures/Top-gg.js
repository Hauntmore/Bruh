const express = require('express');
const { Webhook } = require('@top-gg/sdk');

const initialize = () => {
	const wh = new Webhook(process.env.TOPGGWEBHOOKAUTH);

	const app = express();

	app.post('/dbl', wh.listener((vote) => {
		// dblwebhook

		console.log(vote.user);
	}));

	app.listen(process.env.TOPGGAPPPORT, () => console.log('[Express] The server is running.'));
};

module.exports.initialize = initialize;