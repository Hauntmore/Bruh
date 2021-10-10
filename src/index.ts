import { red } from "chalk";
import { Intents } from "discord.js";
import { ClientBase as Client } from "./structures/Client";
import "./extensions/Extensions";
import * as dotenv from "dotenv";

dotenv.config();

process.on("unhandledRejection", (error: Error) => {
	console.error(`${red.bold("Unhandled Rejection:")}\n${error.stack}`);
});

process.on("uncaughtException", (error: Error) => {
	console.error(`${red.bold("Uncaught Exception:")}\n${error.stack}`);
});

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
    ],
    allowedMentions: {
        parse: [],
        repliedUser: false,
    },
    failIfNotExists: true,
    partials: [],
    presence: {
        activities: [
            {
                name: `${process.env.DISCORD_BOT_DEFAULT_PREFIX} help`,
                type: "COMPETING",
            },
        ],
        status: "online",
    },
    restWsBridgeTimeout: 30000,
    ws: {
        properties: {
            $browser: "Discord iOS",
        },
    },
});

client.start(process.env.DISCORD_BOT_TOKEN);