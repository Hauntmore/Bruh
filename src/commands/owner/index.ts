import { customEmojis } from "../../config/Emojis";

const commands = require("fs")
  .readdirSync(__dirname)
  .filter((c: string) => c !== "index.js")
  .map((c: string) => require(`${__dirname}/${c}`));

export default {
  commands,
  name: `${customEmojis.gear} Owner`,
  label: "owner",
  description: "Actions restricted to only bot staff/developers.",
};
