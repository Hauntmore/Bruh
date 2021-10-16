import {
  CommandInteraction,
  MessageActionRow,
  MessageButton,
  MessageEmbed,
} from "discord.js";
import { ClientBase } from "../../structures/Client";
import { Command } from "../../types";
import { topggVotingLink } from "../../config/Config";

export = <Command>{
  name: "vote",
  description: "Retrieve my vote link!",
  async execute(interaction: CommandInteraction, client: ClientBase) {
    const embed = new MessageEmbed()
      .setTitle(`Hello ${interaction.user.username}!`)
      .setAuthor(
        client.user.tag,
        client.user.displayAvatarURL({ dynamic: true })
      )
      .setDescription(
        "Click on the button to be redirected to the Top.gg website to vote for the bot."
      )
      .setTimestamp();

    const button = new MessageButton()
      .setLabel("Click here!")
      .setURL(topggVotingLink)
      .setStyle("LINK");

    const row = new MessageActionRow().addComponents(button);

    await interaction.reply({ embeds: [embed], components: [row] });
  },
};
