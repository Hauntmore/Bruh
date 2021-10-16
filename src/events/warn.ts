import { bgYellow } from "chalk";
import { Event } from "../types";

export = <Event>{
  name: "warn",
  description: "Emitted for general warnings.",
  execute(info: string) {
    console.log(`${bgYellow("WARNING")}\n${info}`);
  },
};
