import { CommandInteraction, MessageEmbed } from "discord.js";
import { ClientBase } from "../../structures/Client";
import { Command } from "../../types";

export = <Command>{
  name: "about",
  description: "About the bot client.",
  async execute(interaction: CommandInteraction, client: ClientBase) {
    const embed = new MessageEmbed()
      .setTitle(`Hello ${interaction.user.username}!`)
      .setAuthor(
        client.user.tag,
        client.user.displayAvatarURL({ dynamic: true })
      )
      .setDescription(
        `Thank you for using me! I am the v2 rewrite of [Bruh Bot](${
          process.env.BRUH_BOT_INVITE ?? "https://discord.com"
        })! You may find that things are removed, missing, or not working and the bot developer is aware of that. The developer will be working to bring back features you love, in the meantime please be patient and enjoy what is available!`
      )
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
