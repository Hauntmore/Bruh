import fetch from "node-fetch";
import {
  CommandInteraction,
  MessageButton,
  MessageActionRow,
  Formatters,
  Message,
  ButtonInteraction,
} from "discord.js";
import { contentTipMessage } from "../../helpers/Tips";
import { ClientBase } from "../../structures/Client";
import { Command } from "../../types";

export = <Command>{
  name: "docs",
  description: "Search the official Discord.js documentation.",
  usage: "<--query> [--branch] [--target]",
  options: [
    {
      name: "query",
      type: 3,
      description: "The query to search for in the docs.",
      required: true,
    },
    {
      name: "branch",
      description: "The branch of the documentation to view.",
      type: 3,
      choices: [
        {
          name: "stable",
          value: "stable",
        },
        {
          name: "master",
          value: "master",
        },
        {
          name: "rpc",
          value: "rpc",
        },
        {
          name: "commando",
          value: "commando",
        },
        {
          name: "collection",
          value: "collection",
        },
      ],
      required: false,
    },
    {
      name: "target",
      description: "The user to mention.",
      type: 6,
      required: false,
    },
  ],
  ownerOnly: false,
  adminOnly: false,
  cooldown: 10,
  async execute(interaction: CommandInteraction, client: ClientBase) {
    const branch = interaction.options.getString("branch", false) || "stable";

    const embed = await (
      await fetch(
        `https://djsdocs.sorta.moe/v2/embed?src=${branch}&q=${encodeURIComponent(
          interaction.options.getString("query", true)
        )}`
      )
    ).json();

    if (!embed)
      return contentTipMessage(
        interaction,
        "Your query was not found on the documentation.",
        true
      );

    if (embed.fields?.length >= 2 && embed.fields[2]?.value.length > 1024)
      embed.fields[2].value = embed.fields[2]?.value.slice(0, 1002) + "...";

    const button = new MessageButton()
      .setCustomId("1")
      .setStyle("SECONDARY")
      .setEmoji(client.customEmojis.cross);

    const ButtonRow = new MessageActionRow().addComponents(button);

    try {
      if (interaction.options.getUser("target", false))
        await interaction.reply({
          content: `${client.customEmojis.bookmark} ${Formatters.bold(
            `Documentation Suggestion for ${interaction.options.getUser(
              "target",
              false
            )} from ${interaction.user.toString()}:`
          )}`,
          embeds: [embed],
          components: [ButtonRow],
          allowedMentions: { parse: ["users"] },
        });
      else
        await interaction.reply({ embeds: [embed], components: [ButtonRow] });

      const msg = (await interaction.fetchReply()) as Message;

      const filter = (i: ButtonInteraction) =>
        i.user.id === interaction.user.id && i.customId === "1";

      msg
        .awaitMessageComponent({ filter, time: 60000, componentType: "BUTTON" })
        .then(() => {
          msg.delete();
        })
        .catch(() => {
          msg.edit({ components: [] });
        });
    } catch (err) {
      await interaction.reply({
        content: "There was an error parsing your query.\n" + err.message,
        ephemeral: true,
      });
      console.error(err);
    }
  },
};
