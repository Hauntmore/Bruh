import { CommandInteraction, MessageEmbed, MessageActionRow, MessageButton, Permissions } from "discord.js";
import { ClientBase } from "../../structures/Client";
import { Command } from "../../types";

export = <Command> {
	name: "invite",
	description: "Replies with the bot link.",
	async execute(interaction: CommandInteraction, client: ClientBase) {
        const regularInviteLink = client.generateInvite({
            scopes: ["applications.commands", "bot"],
            permissions: [
                Permissions.FLAGS.ADMINISTRATOR,
            ],
        });
        const regularInvite = new MessageButton().setURL(regularInviteLink).setLabel("Invite me!").setStyle("LINK");

        const noIntegrationInviteLink = client.generateInvite({
            scopes: ["applications.commands", "bot"],
        });
		const noIntegrationInvite = new MessageButton().setURL(noIntegrationInviteLink).setLabel("No Integrated Discord Bot Role.").setStyle("LINK");

        const ButtonRow = new MessageActionRow().addComponents(regularInvite, noIntegrationInvite);

		const embed = new MessageEmbed()
            .setTitle(client.user.username)
            .setURL(client.user.displayAvatarURL())
            .setThumbnail(client.user.displayAvatarURL({ format: "png", dynamic: true }))
            .setDescription(`We appreciate you for inviting ${client.user.username}! Thank you for supporting the bot development!\n\n**Click on the button invite of your choice to invite the bot!**`)
            .setTimestamp()
            .setFooter(`Total Servers: ${client.guilds.cache.size}`);

		await interaction.reply({ embeds: [embed], components: [ButtonRow] });
	},
};