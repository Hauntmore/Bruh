import { red } from "chalk";
import { Event } from "../types";
import { exit } from "process";

export = <Event>{
  name: "invalidated",
  description:
    "Emitted when the client's session becomes invalidated. You are expected to handle closing the process gracefully and preventing a boot loop if you are listening to this event.",
  execute() {
    console.log(
      red(
        "The client session is now invalid. I will now be exiting all processes."
      )
    );
    exit(1);
  },
};
