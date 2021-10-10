import { customEmojis } from "../../config/Emojis";

const commands = require("fs").readdirSync(__dirname).filter((c: string) => c !== "index.js").map((c: string) => require(`${__dirname}/${c}`));

export default {
  commands,
  name: `${customEmojis.magnifyingGlass} Exclusive`,
  label: "exclusive",
  description: "These commands are not available to the general public and do not associate formally with the bot.",
};