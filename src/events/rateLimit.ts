import { yellow } from "chalk";
import { RateLimitData } from "discord.js";
import { Event } from "../types";

export = <Event>{
  name: "rateLimit",
  description:
    "Emitted when the client hits a rate limit while making a request.",
  execute(rateLimitData: RateLimitData) {
    console.log(
      `${yellow("Rate Limit Warning")}\n${JSON.stringify(rateLimitData)}`
    );
  },
};
