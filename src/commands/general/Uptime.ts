import { CommandInteraction, MessageEmbed } from "discord.js";
import { embedTipMessage } from "../../helpers/Tips";
import { ClientBase } from "../../structures/Client";
import { Command } from "../../types";

export = <Command>{
  name: "uptime",
  description: "View the bot's current uptime.",
  async execute(interaction: CommandInteraction, client: ClientBase) {
    const { uptime } = client;

    let totalSeconds = uptime / 1000;

    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);

    totalSeconds %= 3600;

    const timedValue = Math.round(Date.now() / 1000 - uptime / 1000);

    const time = `${days}d ${hours}h ${minutes}m ${seconds}s`;

    const embed = new MessageEmbed()
      .setTitle("My Uptime!")
      .setDescription(
        `${time} ~ Up since <t:${timedValue.toFixed() as string}:R>`
      )
      .setFooter("Requested by: " + interaction.user.tag)
      .setColor(client.color)
      .setTimestamp();

    embedTipMessage(interaction, [embed], true);
  },
};
