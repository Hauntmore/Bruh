import { bgRed } from "chalk";
import { Event } from "../types";

export = <Event>{
  name: "shardError",
  description:
    "Emitted whenever a shard's WebSocket encounters a connection error.",
  execute(error: Error, shardId: number) {
    console.log(
      bgRed(`Shard Id: ${shardId} has encountered an error:\n${error.stack}`)
    );
  },
};
