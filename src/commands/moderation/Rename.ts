import { CommandInteraction, GuildMember, Permissions } from "discord.js";
import { contentTipMessage } from "../../helpers/Tips";
import { ClientBase } from "../../structures/Client";
import { Command } from "../../types";

export = <Command>{
  name: "rename",
  description: "Rename a member.",
  usage: "<--target> [--nickname]",
  options: [
    {
      name: "member",
      type: 6,
      description: "The member to rename.",
      required: true,
    },
    {
      name: "nickname",
      type: 3,
      description:
        "The new nickname to apply (defaults to their username excluding the discriminator).",
      required: false,
    },
  ],
  async execute(interaction: CommandInteraction, client: ClientBase) {
    const member = interaction.options.getMember("member", true) as GuildMember;

    if (
      !(interaction.member.permissions as Permissions).has(
        Permissions.FLAGS.MANAGE_NICKNAMES,
        true
      )
    )
      return contentTipMessage(
        interaction,
        "You do not have the sufficient permissions to execute this interaction.",
        true
      );

    if (
      interaction.guild.ownerId !== interaction.user.id &&
      member.roles.highest.position >=
        (interaction.member as GuildMember).roles.highest.position
    )
      return contentTipMessage(
        interaction,
        "You cannot manage someone with an equal or higher position.",
        true
      );

    if (
      member.roles.highest.position >=
      interaction.guild.me.roles.highest.position
    )
      return contentTipMessage(
        interaction,
        `I (${client.user.tag} ~ ${client.user.id}) cannot manage ${member.user.tag} due to them having an equal or higher position than me.`,
        true
      );

    const nickname =
      interaction.options.getString("nickname", false) || member.user.username;

    await member.setNickname(
      nickname,
      `Renamed by ${interaction.user.tag} (${interaction.user.id}).`
    );

    contentTipMessage(
      interaction,
      `You have set ${member.user.tag}'s nickname to \`${nickname}\`.`,
      false
    );
  },
};
