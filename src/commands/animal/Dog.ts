import { CommandInteraction, MessageEmbed } from "discord.js";
import { ClientBase } from "../../structures/Client";
import { Command } from "../../types";
import fetch from "node-fetch";

export = <Command>{
  name: "dog",
  description: "OMG DOGS ARE SO CUTE.\n- Every girl ever.",
  async execute(interaction: CommandInteraction, client: ClientBase) {
    const { message } = await (
      await fetch("http://localhost:" + process.env.PORT + "/dogs")
    ).json();

    const embed = new MessageEmbed()
      .setTitle(client.customEmojis.dog)
      .setImage(message)
      .setColor("BLURPLE");

    await interaction.reply({ embeds: [embed] });
  },
};
