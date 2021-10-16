import { TextChannel } from "discord.js";
import { guildCounterChannelId } from "../config/Config";
import { ClientBase } from "../structures/Client";
import { Event } from "../types";

export = <Event>{
  name: "guildDelete",
  description:
    "Emitted whenever a guild kicks the client or the guild is deleted/left.",
  async execute(client: ClientBase) {
    const channel = client.channels.cache.get(
      guildCounterChannelId
    ) as TextChannel;

    const guildSize = (await client.guilds.fetch()).size;
    channel.setName(`Servers: ${guildSize.toLocaleString()}`);
  },
};
