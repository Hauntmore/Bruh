import {
  CommandInteraction,
  Guild,
  GuildMember,
  MessageEmbed,
  Role,
  UserFlagsString,
} from "discord.js";
import { ClientBase } from "../../structures/Client";
import { Command } from "../../types";
import { create, SourceBin } from "sourcebin";
import { Utils } from "../../core/Utils";

const flags: any = {
  DISCORD_EMPLOYEE: "Discord Employee",
  DISCORD_PARTNER: "Discord Partner",
  BUGHUNTER_LEVEL_1: "Bug Hunter (Level 1)",
  BUGHUNTER_LEVEL_2: "Bug Hunter (Level 2)",
  HYPESQUAD_EVENTS: "HypeSquad Events",
  HOUSE_BRAVERY: "House of Bravery",
  HOUSE_BRILLIANCE: "House of Brilliance",
  HOUSE_BALANCE: "House of Balance",
  EARLY_SUPPORTER: "Early Supporter",
  TEAM_USER: "Team User",
  SYSTEM: "System",
  VERIFIED_BOT: "Verified Bot",
  VERIFIED_DEVELOPER: "Verified Bot Developer",
};

export = <Command>{
  name: "whois",
  description: "View information on a member.",
  usage: "[--target]",
  options: [
    {
      name: "member",
      type: 6,
      description: "The member to fetch information from.",
      required: false,
    },
  ],
  async execute(interaction: CommandInteraction, client: ClientBase) {
    const { guild, options, user } = interaction;

    const member = (options.getMember("member", false) ||
      interaction.member) as GuildMember;

    const guilds: Array<string> = [];

    client.guilds.cache.forEach(async (g: Guild) => {
      const cache = g.members.cache.get(member.user.id);
      const members = g.members.cache.size;
      if (cache)
        guilds.push(
          `${g.name} ~ ${g.id} | ${members.toLocaleString()} members.`
        );
    });

    let presence;

    switch (member.presence?.status ?? "offline") {
      case "online":
        presence = "Online";
        break;
      case "dnd":
        presence = "Do not Disturb";
        break;
      case "idle":
        presence = "Idle";
        break;
      case "offline":
        presence = "Offline";
        break;
      default:
        presence = "Offline";
        break;
    }

    await interaction.deferReply();

    const bin: SourceBin = await create(
      [
        {
          content: `Guilds:\n${guilds.join("\n\n")}`,
          language: "javascript",
        },
      ],
      {
        title: `${member.user.tag}'s Mutual Guilds with ${client.user.tag}!`,
        description: `Authorized by ${user.tag} (${user.id}).`,
      }
    );

    const userFlags = member.user.flags.toArray();

    const roles = member.roles.cache
      .filter((r: Role) => r.id !== interaction.guild.id)
      .map((r: Role) => r)
      .join(" ");

    const embed: MessageEmbed = new MessageEmbed()
      .setTitle(`${member.user.tag} ~ ${member.user.id}`)
      .setThumbnail(
        member.user.displayAvatarURL({ dynamic: true, format: "png" })
      )
      .addField("**Nickname**:", `${member.displayName}`, false)
      .addField(
        "**Bot**:",
        `${
          member.user.bot
            ? client.customEmojis.checkmark
            : client.customEmojis.cross
        }`,
        false
      )
      .addField(
        "**Pending**:",
        `${
          member.pending
            ? client.customEmojis.checkmark
            : client.customEmojis.cross
        }`,
        false
      )
      .addField("**Presence**:", `${presence}`, false)
      .addField(
        "**Member's Display Color**:",
        `${member.displayHexColor} ~ ${member.displayColor}`,
        false
      )
      .addField(
        "**Joined at**:",
        `<t:${Math.round(member.joinedTimestamp / 1000)}:f>`,
        false
      )
      .addField(
        "**Created at**:",
        `<t:${Math.round(member.user.createdTimestamp / 1000)}:f>`,
        false
      )
      .addField("**Mutual Guilds**:", `[SourceBin](${bin.url})`, false)
      .addField(
        "**Permissions**:",
        `${member.permissions
          .toArray()
          .map((p) => Utils.formatPermissions(p))
          .join(", ")}`,
        false
      )
      .addField(
        "**Flags**:",
        `${
          userFlags.length
            ? userFlags.map((flag: UserFlagsString) => flags[flag]).join(", ")
            : "No Discord Flags Found."
        }`,
        false
      )
      .addField("**Roles**:", `${roles}`, false)
      .setTimestamp()
      .setColor(member.displayHexColor || client.color)
      .setFooter(guild.name, guild.iconURL({ dynamic: true, format: "png" }));

    await interaction.editReply({ embeds: [embed] });
  },
};
