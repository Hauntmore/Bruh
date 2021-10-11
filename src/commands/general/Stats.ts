import { CommandInteraction, version as djsversion } from "discord.js";
import { Utils } from "../../core/Utils";
import { embedTipMessage } from "../../helpers/Tips";
import { ClientBase } from "../../structures/Client";
import { Command } from "../../types";

export = <Command> {
	name: "stats",
	description: "Get some basic bot stats.",
	async execute(interaction: CommandInteraction, client: ClientBase) {
        const { uptime } = client;
    
		const embed = {
			fields: [
				{
					name: "Cache",
					value:
                `**Channels**: ${client.channels.cache.size.toLocaleString()
                }\n` +
                `**Emotes**: ${client.emojis.cache.size.toLocaleString()}\n` +
                `**Guilds**: ${client.guilds.cache.size.toLocaleString()}\n` +
                `**Users**: ${client.users.cache.size.toLocaleString()}\n`,
					inline: false,
				},
				{
					name: "Data",
					value:
                `**Uptime**: ${Math.round(Date.now() / 1000 - uptime / 1000,
                )}\n` +
                `**Discord API Websocket Ping**: ${Math.round(client.ws.ping)}ms\n` +
				`**Interaction Latency**: ${Date.now() - interaction.createdTimestamp}ms\n` +
				`**RAM**: ${Utils.formatBytes(process.memoryUsage().heapUsed)}\n`,
				},
			],
			color: client.color,
			title: "Bot Statistics",
			footer: {
				text: `Bot Commands: ${client.commands.size.toLocaleString()} | Discord.js version: ${djsversion}`,
			},
			thumbnail: {
				url: client.user.displayAvatarURL({ dynamic: true, size: 1024 }),
			},
		};

		embedTipMessage(interaction, [embed], false);
	},
};