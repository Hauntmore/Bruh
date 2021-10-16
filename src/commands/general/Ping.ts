import { CommandInteraction } from "discord.js";
import { contentTipMessage } from "../../helpers/Tips";
import { ClientBase } from "../../structures/Client";
import { Command } from "../../types";

export = <Command>{
  name: "ping",
  description:
    "View the Discord bot's websocket connection latency with the Discord gateway in miliseconds.",
  cooldown: 5,
  async execute(interaction: CommandInteraction, client: ClientBase) {
    const { ws } = client;

    const latency = Math.round(ws.ping);

    contentTipMessage(interaction, `🏓 Ping! \`${latency}\`ms`, true);
  },
};
