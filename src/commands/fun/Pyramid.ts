import { Utils } from "../../core/Utils";
import { CommandInteraction } from "discord.js";
import { Command } from "../../types";
import { contentTipMessage } from "../../helpers/Tips";

export = <Command> {
	name: "pyramid",
	description: "Create a pyramid made up of `*`.",
	usage: "<--int>",
	options: [
		{
			name: "amount",
			type: 4,
			description: "How tall to generate the pyramid (defaults to 5).",
			required: false,
		},
	],
	cooldown: 10,
	async execute(interaction: CommandInteraction) {
		const amount = interaction.options.getInteger("amount", false) || 5;

		if (amount <= 2 || amount > 15) return contentTipMessage(interaction, "Your amount should be under 15 and greater than 2!", true);

		const pyramid = Utils.pyramid(amount);

        contentTipMessage(interaction, `\`\`\`\n${pyramid}\n\`\`\``, false);
	},
};