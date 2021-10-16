import { CommandInteraction } from "discord.js";
import { Command } from "../../types";

export = <Command>{
  name: "google",
  description: "Ask her something.",
  usage: "<--search>",
  options: [
    {
      name: "search",
      type: 3,
      description: "The query to search on Google.",
      required: true,
    },
  ],
  cooldown: 5,
  async execute(interaction: CommandInteraction) {
    const args = interaction.options.getString("search", true);

    await interaction.reply({
      content: `http://lmgtfy.com/?q=${args.split(" ").join("+")}`,
    });
  },
};
