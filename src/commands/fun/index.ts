import { customEmojis } from "../../config/Emojis";

const commands = require("fs")
  .readdirSync(__dirname)
  .filter((c: string) => c !== "index.js")
  .map((c: string) => require(`${__dirname}/${c}`));

export default {
  commands,
  name: `${customEmojis.joystick} Fun`,
  label: "fun",
  description: "These commands are fun ig?",
};
