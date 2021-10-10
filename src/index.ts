import { red } from "chalk";
import { Intents } from "discord.js";
import { ClientBase as Client } from "./structures/Client";
import "./extensions/Extensions";
import * as dotenv from "dotenv";

dotenv.config();

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
                name: "building a business with Elon Musk.",
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

process.on("unhandledRejection", (error: Error) => {
    client.errorWebhook.send({ content: "**Unhandled Rejection:**\n\n" + error.stack });
	console.error(`${red.bold("Unhandled Rejection:")}\n${error.stack}`);
});

process.on("uncaughtException", (error: Error) => {
    client.errorWebhook.send({ content: "**Uncaught Exception:**\n\n" + error.stack });
	console.error(`${red.bold("Uncaught Exception:")}\n${error.stack}`);
});

client.start(process.env.DISCORD_BOT_TOKEN);