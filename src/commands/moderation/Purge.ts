import { CommandInteraction, TextChannel, GuildMember, Permissions } from "discord.js";
import { contentTipMessage } from "../../helpers/Tips";
import { Command } from "../../types";

export = <Command> {
	name: "purge",
	description: "Prune some messages.",
    usage: "<--int>",
	options: [
		{
			name: "amount",
			type: 4,
			description: "The amount of messages to delete (defaults 15 if no value is given).",
			required: false,
		},
	],
	async execute(interaction: CommandInteraction) {
		let int: number = interaction.options.getInteger("amount", false) || 15;

        if (int <= 0 || int > 100) int = 10;

        if (!(interaction.member as GuildMember).permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) return contentTipMessage(interaction, "You need the `MANAGE_MESSAGES` permission to execute this action!", true);

        try {
            const channel = interaction.channel as TextChannel;

            const fetch = await channel.messages.fetch({ limit: int });

            const deletedMessages = await channel.bulkDelete(fetch, true);

            const results: any = {};

            for (const [, deleted] of deletedMessages) {
                const user = `${deleted.author.username}#${deleted.author.discriminator}`;
                if (!results[user]) results[user] = 0;
                results[user]++;
            }

            const userMessageMap = Object.entries(results);

            const finalResult = `${deletedMessages.size} message${deletedMessages.size > 1 ? "s were pruned." : " was pruned!"}\n\n${userMessageMap.map(([user, messages]) => `**${user}**: ${messages}`).join("\n")}`;

            await contentTipMessage(interaction, finalResult, false);
            setTimeout(() => interaction.deleteReply(), 5000);
        } catch (err) {
            console.error(err);
        }
	},
};