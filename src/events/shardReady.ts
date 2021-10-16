import { Event } from "../types";
import { Snowflake } from "discord.js";
import { green } from "chalk";

export = <Event>{
  name: "shardReady",
  description: "Emitted when a shard turns ready.",
  execute(id: number, unavailableGuilds: Set<Snowflake>) {
    console.log(
      green(
        `Shard Id: ${id} is ready!\nUnavailable Guilds: ${
          unavailableGuilds ?? "None"
        }`
      )
    );
  },
};
