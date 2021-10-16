import { CommandInteraction, MessageEmbed } from "discord.js";
import { Parser } from "expr-eval";
import { Command } from "../../types";

export = <Command>{
  name: "math",
  description: "Solve a math expression.",
  usage: "<--expression>",
  options: [
    {
      name: "expression",
      type: 3,
      description: "The expression to evaluate.",
      required: true,
    },
  ],
  cooldown: 5,
  async execute(interaction: CommandInteraction) {
    const content = interaction.options.getString("expression", true);

    const embed = new MessageEmbed();

    embed.setTitle("Math Evaluation");
    embed.addField("Input", `\`\`\`ts\n${content}\n\`\`\``);

    const parser = new Parser({ operators: { in: true, assignment: true } });

    try {
      const res = parser.evaluate(content);
      embed.addField("Output", `\`\`\`ts\n${res}\n\`\`\``);
      await interaction.reply({ embeds: [embed] });
    } catch (err) {
      embed.addField("Output", `\`\`\`ts\nError: ${err.message}\n\`\`\``);
      await interaction.reply({ embeds: [embed] });
    }
  },
};
