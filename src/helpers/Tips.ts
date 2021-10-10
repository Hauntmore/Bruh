import { CommandInteraction, MessageActionRow, MessageEmbed } from "discord.js";
import { tips } from "../config/Config";

const random = Math.floor(Math.random() * 100) + 2;
const tip = tips.random();

export async function embedTipMessage(interaction: CommandInteraction, embeds: Array<MessageEmbed>, ephemeral?: boolean | false, components?: Array<MessageActionRow> | []) {
    if (random >= 15 && random <= 25) {
        return await interaction.reply({
            content: `**Tip**: ${tip}`,
            embeds: embeds,
            ephemeral: ephemeral,
            components: components,
        });
    } else {
        return await interaction.reply({
            embeds: embeds,
            ephemeral: ephemeral,
            components: components,
        });
    }
}

export async function contentTipMessage(interaction: CommandInteraction, content: string, ephemeral?: boolean | false, components?: Array<MessageActionRow> | []) {
    if (random >= 15 && random <= 25) {
        return await interaction.reply({
            content: `${content}\n\n**Tip**: ${tip}`,
            ephemeral: ephemeral,
            components: components,
        });
    } else {
        return await interaction.reply({
            content: content,
            ephemeral: ephemeral,
            components: components,
        });
    }
}