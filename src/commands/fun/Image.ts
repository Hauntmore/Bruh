import { CommandInteraction, MessageAttachment } from "discord.js";
import { ClientBase } from "../../structures/Client";
import { Command } from "../../types";
import Canvas from "node-canvas";
import { contentTipMessage, fileTipMessage } from "../../helpers/Tips";
import fetch from "node-fetch";

export = <Command>{
  name: "test",
  description: "Image manipulation like your girlfriend manipulating you..",
  usage: "<--image> [--args]",
  options: [
    {
      name: "pepe",
      type: 1,
      description: "H0ly pepe can talk!",
      options: [
        {
          name: "text",
          description: "The text for pepe to announce.",
          type: 3,
          required: true,
        },
      ],
    },
    {
      name: "gay",
      type: 1,
      description: "Did you know I'm pride?",
      options: [
        {
          name: "user",
          description: "The user to ~~seduce into pride~~ target.",
          type: 6,
          required: false,
        },
      ],
    },
    {
      name: "clyde",
      type: 1,
      description: "Bring Clyde in your hearts everywhere.",
      options: [
        {
          name: "text",
          description: "The text for Clyde to reciprocate.",
          type: 3,
          required: true,
        },
      ],
    },
  ],
  cooldown: 5,
  async execute(interaction: CommandInteraction, client: ClientBase) {
    const command = interaction.options.getSubcommand(true);

    if (command === "pepe") {
      await interaction.deferReply({ fetchReply: true });

      const text = interaction.options.getString("text", true);

      const bg = await Canvas.loadImage(
        "https://github.com/katie07/Imagayes/blob/main/oo.png?raw=true"
      );

      const canvas = Canvas.createCanvas(206, 206);
      const ctx = canvas.getContext("2d");

      ctx.drawImage(bg, 0, 0, 206, 206);
      ctx.font = "20px sans-serif";
      ctx.fillStyle = "#00000";

      ctx.fillText(text, canvas.width / 9.8, canvas.height / 4.0);

      const attachment = new MessageAttachment(canvas.toBuffer(), "pepe.png");

      await interaction.editReply({ files: [attachment] });
    } else if (command === "gay") {
      const user =
        interaction.options.getUser("user", false) || interaction.user;

      if (user.id === client.user.id)
        return contentTipMessage(interaction, "You wish lmao.", false);

      const buffer = await (
        await fetch(
          "https://api.monkedev.com/canvas/gay?imgUrl=" +
            encodeURIComponent(user.displayAvatarURL({ format: "jpg" }))
        )
      ).buffer();

      const attachment = new MessageAttachment(buffer, "gay.jpg");

      fileTipMessage(interaction, [attachment], false);
    } else if (command === "clyde") {
      await interaction.deferReply({ fetchReply: true });

      const text = interaction.options.getString("text", true);

      if (text.length >= 71)
        return contentTipMessage(
          interaction,
          "Please input text that is under 71 characters.",
          true
        );

      const res = await (
        await fetch(
          encodeURI(`https://nekobot.xyz/api/imagegen?type=clyde&text=${text}`)
        )
      ).json();

      const attachment = new MessageAttachment(res.message, "clyde.png");

      await interaction.editReply({ files: [attachment] });
    }
  },
};
