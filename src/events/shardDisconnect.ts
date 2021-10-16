import { red } from "chalk";
import { Event } from "../types";

export = <Event>{
  name: "shardDisconnect",
  description:
    "Emitted when a shard's WebSocket disconnects and will no longer reconnect.",
  execute(event: CloseEvent, id: number) {
    console.log(red(`Shard Id: ${id} has disconnected.\n${event}`));
  },
};
