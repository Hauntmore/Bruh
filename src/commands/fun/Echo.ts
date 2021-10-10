import { CommandInteraction, Message } from "discord.js";
import { ClientBase } from "../../structures/Client";
import { Command } from "../../types";

export = <Command> {
	name: "echo",
	description: "Replies back with the given input.",
	usage: "<--input>",
    options: [
		{
			name: "input",
			type: 3,
			description: "The input to reply back with.",
			required: true,
		},
	],
	cooldown: 5,
	async execute(interaction: CommandInteraction, client: ClientBase) {
		const msg = (await interaction.reply({ content: `${interaction.options.getString("input", true)}\n\n- **${interaction.user.tag}**`, fetchReply: true }) as Message);

        msg.react(client.customEmojis.checkmark);
	},
};