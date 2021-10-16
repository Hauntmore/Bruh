import {
  CommandInteraction,
  MessageEmbed,
  MessageAttachment,
} from "discord.js";
import { Utils } from "../../core/Utils";
import { ClientBase } from "../../structures/Client";
import { Command } from "../../types";

module.exports = <Command>{
  name: "eval",
  description: "Evaluate code inside Discord.",
  usage: "<--code>",
  options: [
    {
      name: "code",
      type: 3,
      description: "The code to evaluate.",
      required: true,
    },
  ],
  ownerOnly: true,
  async execute(interaction: CommandInteraction, client: ClientBase) {
    try {
      let code = interaction.options.getString("code", true);

      code = code.includes("await") ? `(async () => { ${code} })();` : code;

      let { time, result: evaled }: any = await Utils.timeit(() => eval(code));

      const type =
        typeof evaled === "undefined" ? "undefined" : evaled.constructor;

      const formatted = `Time: \`${time.toFixed(3)} ms\` • Type: \`${
        type.name || "undefined"
      }\``;

      if (type === MessageEmbed || type === MessageAttachment) {
        return await interaction.reply({
          content: `Time: \`${time.toFixed(3)} ms\`\n${evaled}`,
        });
      } else if (typeof evaled !== "string") {
        evaled = require("util").inspect(evaled);
      }

      if (evaled.length > 1900) {
        await interaction.deferReply({ fetchReply: true });
        await client.delay(5000);

        const result = new MessageAttachment(Buffer.from(evaled), "result.ts");

        await interaction.editReply({ content: formatted, files: [result] });
      } else {
        await interaction.reply({
          content: `${formatted}, \`\`\`ts\n${evaled}\`\`\``,
        });
      }
    } catch (err) {
      const error = clean(err);

      if (err.length > 1900) {
        await interaction.deferReply({ fetchReply: true });
        await client.delay(5000);

        const result = new MessageAttachment(Buffer.from(error), "Error.ts");

        await interaction.editReply({
          content: "**An error has occured:**",
          files: [result],
        });
      } else {
        await interaction.reply({
          content: `**An error has occured:**\n\`\`\`ts\n${error}\`\`\``,
        });
      }
      throw err;
    }
  },
};

const clean = (text: string) => {
  if (typeof text === "string") {
    return text
      .replace(/`/g, "`" + String.fromCharCode(8203))
      .replace(/@/g, "@" + String.fromCharCode(8203))
      .replace(process.env.DISCORD_BOT_TOKEN, "****");
  } else {
    return text;
  }
};
