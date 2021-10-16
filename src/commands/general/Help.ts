import { CommandInteraction, MessageEmbed } from "discord.js";
import { readdirSync } from "fs";
import { join } from "path";
import { customEmojis } from "../../config/Emojis";
import { contentTipMessage, embedTipMessage } from "../../helpers/Tips";
import { ClientBase } from "../../structures/Client";
import { Command } from "../../types";

export = <Command>{
  name: "help",
  description: "Generate a list of available commands.",
  usage: "[--command | category]",
  options: [
    {
      name: "args",
      type: 3,
      description: "The category or command to search.",
      required: false,
    },
  ],
  async execute(interaction: CommandInteraction, client: ClientBase) {
    const args = interaction.options.getString("args", false);

    const commands = client.commands;
    const command = commands.find(
      (c) => c.name?.toLowerCase() === args?.toLowerCase()
    );

    const categories: Array<string> = [];

    const set = [...new Set(commands.map((c) => c.category))];

    const folders = readdirSync(join(__dirname, "../", "../", "commands"));

    const embed = new MessageEmbed()
      .setThumbnail(client.user.displayAvatarURL({ dynamic: true, size: 1024 }))
      .setFooter(`${commands.size} Commands • ${folders.length - 1} Categories`)
      .setTimestamp();

    if (!args) {
      const folders = readdirSync(join(__dirname, "../"));

      for (const folder of folders) {
        const files = readdirSync(join(__dirname, "../", folder)).filter(
          (file) => file.endsWith(".js") && file.startsWith("index")
        );

        for (const file of files) {
          const category = require(join(__dirname, "../", `${folder}/`, file));

          if (category.default.name === customEmojis.gear + " Owner") continue;

          categories.push(
            `\`${category.default.name}\`\n[\`/help ${category.default.label}\`](${process.env.DISCORD_BOT_INVITE})`
          );
        }
      }

      const map = categories.join("\n\n");

      embed.setDescription(
        "Here is a list of the available categories!\n\n" + map
      );
    } else if (command) {
      embed.setTitle(command.name.title());

      if (command.description) embed.setDescription(command.description);

      if (command.usage) {
        embed.addField(
          "**Usage**:",
          Array.isArray(command.usage)
            ? `${command.usage
                .map((u: string) => `\`\`\`css\n${u}\n\`\`\``)
                .join("\n")}`
            : `\`\`\`css\n${command.usage}\n\`\`\``
        );
      }

      if (command.cooldown) {
        embed.addField(
          "**Cooldown**:",
          `\`\`\`js\n${command.cooldown}s\n\`\`\``,
          false
        );
      }
    } else if (set.includes(args?.toLowerCase())) {
      const cmds = commands.filter((c) => c.category === args?.toLowerCase());
      embed.setTitle(args.title());
      embed.setDescription(
        cmds.size
          ? cmds.map((c) => `\`${c.name}\``).join(" ")
          : "No commands are available for this category."
      );
    } else if (
      set.includes("owner") &&
      !(
        client.botModerators.includes(interaction.user.id) ||
        client.owners.includes(interaction.user.id)
      )
    ) {
      return;
    } else {
      return contentTipMessage(
        interaction,
        "Why is it that hard for you to give me a query that exists.",
        true
      );
    }

    embedTipMessage(interaction, [embed], false);
  },
};
