import { CommandInteraction } from "discord.js";
import { Database } from "../../core/Database";
import { Command } from "../../types";

export = <Command> {
	name: "trigger",
	description: "Configure your guild's auto-responses.",
	usage: "<--subcommand> [--value]",
    options: [
		{
            name: "create",
            type: 1,
            description: "Create an auto-response.",
            options: [
                {
                    name: "name",
                    description: "The auto-response's name.",
                    type: 6,
                    required: true,
                },
                {
                    name: "content",
                    description: "The content of the auto-response",
                    type: 6,
                    required: true,
                },
            ],
        },
        {
            name: "delete",
            type: 1,
            description: "Delete an auto-response.",
            options: [
                {
                    name: "name",
                    description: "The auto-response to delete.",
                    type: 6,
                    required: true,
                },
            ],
        },
	],
	cooldown: 5,
	async execute(interaction: CommandInteraction) {
        const command = interaction.options.getSubcommand(true);

        if (command === "create") {
            const name = interaction.options.getString("name", true);

            const content = interaction.options.getString("content", true);

            await Database.createGuildTrigger(interaction.guild.id, name, content);
        } else if (command === "delete") {
            const name = interaction.options.getString("name", true);

            await Database.deleteGuildTrigger(interaction.guild.id, name);
        }
	},
};