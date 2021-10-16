import { customEmojis } from "../../config/Emojis";

const commands = require("fs")
  .readdirSync(__dirname)
  .filter((c: string) => c !== "index.js")
  .map((c: string) => require(`${__dirname}/${c}`));

export default {
  commands,
  name: `${customEmojis.bear} Animal`,
  label: "animal",
  description:
    "Cute animals that will make you not simp for your significant other.",
};
