import { CommandInteraction, MessageActionRow, MessageButton, MessageEmbed, ButtonInteraction, Message } from "discord.js";
import { ClientBase } from "../../structures/Client";
import { Command } from "../../types";

export = <Command> {
	name: "avatar",
	description: "Display a user's avatar!",
	usage: "[--target]",
	options: [
		{
			name: "user",
			type: 6,
			description: "The optional user to fetch an avatar from.",
			required: false,
		},
	],
	async execute(interaction: CommandInteraction, client: ClientBase) {
		const user = interaction.options.getUser("user") || interaction.user;

		const fetched = await client.users.fetch(user.id, { force: true });

		const ButtonRow = new MessageActionRow()
			.addComponents(
				new MessageButton().setURL(user.displayAvatarURL({ format: "png" })).setLabel("png").setStyle("LINK"),
				new MessageButton().setURL(user.displayAvatarURL({ format: "webp" })).setLabel("webp").setStyle("LINK"),
				new MessageButton().setURL(user.displayAvatarURL({ format: "jpg" })).setLabel("jpg").setStyle("LINK"),
				new MessageButton().setURL(user.displayAvatarURL({ format: "jpeg" })).setLabel("jpeg").setStyle("LINK"),
				new MessageButton().setCustomId("1").setEmoji(client.customEmojis.cross).setStyle("SECONDARY")
				);

		// const row = ButtonRow instanceof Array ? [...ButtonRow] : [ButtonRow];

        const embed = new MessageEmbed()
            .setTitle(`${user.tag}'s Avatar.`)
			.setImage(user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
			.setThumbnail(fetched.bannerURL({ dynamic: true }))
            .setColor(fetched.hexAccentColor || client.color)
            .setTimestamp();

		await interaction.reply({ embeds: [embed], components: [ButtonRow] });

		const msg = await interaction.fetchReply() as Message;

		const filter = (i: ButtonInteraction) => i.user.id === interaction.user.id && i.customId === "1";

		msg.awaitMessageComponent({ filter, time: 60000, componentType: "BUTTON" })
			.then(() => {
				msg.delete();
			})
			.catch(() => {
				msg.edit({ components: [] });
			});
	},
};