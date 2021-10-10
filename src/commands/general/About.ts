import { CommandInteraction, MessageEmbed } from "discord.js";
import { ClientBase } from "../../structures/Client";
import { Command } from "../../types";

export = <Command> {
	name: "about",
	description: "About the bot client.",
	async execute(interaction: CommandInteraction, client: ClientBase) {
		const embed = new MessageEmbed()
            .setTitle(`Hello ${interaction.user.username}!`)
            .setAuthor(client.user.tag, client.user.displayAvatarURL())
            .setDescription(`Thank you for using me! I am the v2 rewrite of [Bruh Bot](${process.env.BRUH_BOT_INVITE ?? "https://discord.com"})!`)
            .setTimestamp();

		await interaction.reply({ embeds: [embed] });
	},
};