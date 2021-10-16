import { bgRed } from "chalk";
import { Event } from "../types";

export = <Event>{
  name: "error",
  description: "Emitted when the client encounters an error.",
  execute(error: Error) {
    console.error(bgRed(error.stack));
  },
};
