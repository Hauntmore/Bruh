import { bgYellow } from "chalk";
import { Event } from "../types";

export = <Event> {
	name: "shardResume",
	description: "Emitted when a shard resumes successfully.",
	execute(id: number, replayedEvents: number) {
		console.log(bgYellow(`Shard Id: ${id} has resumed. Replayed events: ${replayedEvents}`));
	},
};