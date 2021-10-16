import { bgYellow } from "chalk";
import { Event } from "../types";

export = <Event>{
  name: "shardReconnecting",
  description:
    "Emitted when a shard is attempting to reconnect or re-identify.",
  execute(id: number) {
    console.log(bgYellow(`Shard Id: ${id} is attempting to reconnect.`));
  },
};
