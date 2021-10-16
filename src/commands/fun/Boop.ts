import { CommandInteraction } from "discord.js";
import { Command } from "../../types";

export = <Command>{
  name: "boop",
  description: "Boop!",
  async execute(interaction: CommandInteraction) {
    await interaction.reply({ content: "Boop!" });
  },
};
