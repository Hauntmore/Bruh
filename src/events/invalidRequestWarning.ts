import { yellow } from "chalk";
import { InvalidRequestWarningData } from "discord.js";
import { Event } from "../types";

export = <Event> {
	name: "invalidRequestWarning",
	description: "Emitted periodically when the process sends invalid requests to let users avoid the 10k invalid requests in 10 minutes threshold that causes a ban.",
	execute(invalidRequestWarningData: InvalidRequestWarningData) {
		console.log(`${yellow.bold("Invalid Request Warning")}\n${invalidRequestWarningData}`);
	},
};