import { CommandInteraction, MessageEmbed, TextChannel } from "discord.js";
import { contentTipMessage } from "../../helpers/Tips";
import { ClientBase } from "../../structures/Client";
import { Command } from "../../types";

export = <Command> {
	name: "firstmessage",
	description: "View the first message in a channel.",
	usage: "[--channel]",
    options: [
		{
            name: "channel",
            type: 7,
            description: "The channel to fetch the first message from.",
            required: false,
        },
	],
	cooldown: 3,
	async execute(interaction: CommandInteraction, client: ClientBase) {
		const channel = (interaction.options.getChannel("channel", false) || interaction.channel) as TextChannel;

        if (channel.type !== "GUILD_TEXT") return contentTipMessage(interaction, "The channel must be a `GUILD_TEXT` channel.", true);

		const fetchMessages = await channel.messages.fetch({ limit: 1, after: "1" });

		const msg = fetchMessages.first();

		await interaction.reply({ embeds: [new MessageEmbed()
			.setTitle(channel.name)
			.setURL(msg.url)
			.setThumbnail(msg.author.displayAvatarURL({ dynamic: true }))
			.addField("**Author**:", `${msg.author.toString()}`, true)
			.addField("**Message Id**:", `${msg.id}`, true)
			.addField("**Message created at**:", `${msg.createdAt.toLocaleDateString()}`, true)
            .setTimestamp()
            .setColor(msg.member?.displayHexColor ?? client.color)
		] });
	},
};