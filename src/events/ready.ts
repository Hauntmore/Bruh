import { ClientBase } from "../structures/Client";
import { Event } from "../types";
import { cyan } from "chalk";

export = <Event> {
    name: "ready",
    description: "Emitted when the client becomes ready to start working.",
    once: true,
    execute(client: ClientBase) {
        console.log(cyan.dim(`${client.user.tag} (${client.user.id})'s instance has been launched.`));
    },
};