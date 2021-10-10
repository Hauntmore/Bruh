import { Event } from "../types";
import { gray } from "chalk";

export = <Event> {
    name: "debug",
    description: "Emitted for general debugging information.",
    execute(info: string) {
        console.log(gray.underline(info));
    },
};