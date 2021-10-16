import { CommandInteraction, MessageActionRow, MessageAttachment, MessageEmbed } from "discord.js";
import { tips } from "../config/Config";

const random = Math.floor(Math.random() * 100) + 2;
const tip = tips.random();

/**
 * 
 * @param {CommandInteraction} interaction The CommandInteraction class.
 * @param {MessageEmbed[] | Object[]} embeds The array of embeds or embed objects to send.
 * @param {boolean} ephemeral Whether or not to send the interaction as ephemeral.
 * @param {MessageActionRow[]} components Array of MessageActionRows.
 * @returns {Promise<void>} A void promise.
 */
export async function embedTipMessage(interaction: CommandInteraction, embeds: Array<MessageEmbed | Object>, ephemeral?: boolean | false, components?: Array<MessageActionRow> | []): Promise<void> {
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

/**
 * 
 * @param {CommandInteraction} interaction The CommandInteraction class.
 * @param {string} content The content to send.
 * @param {boolean} ephemeral Whether or not to send the interaction as ephemeral.
 * @param {MessageActionRow[]} components Array of MessageActionRows.
 * @returns {Promise<void>} A void promise.
 */
export async function contentTipMessage(interaction: CommandInteraction, content: string, ephemeral?: boolean | false, components?: Array<MessageActionRow> | []): Promise<void> {
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

/**
 * 
 * @param {CommandInteraction} interaction The CommandInteraction class.
 * @param {string} files The array of files to send.
 * @param {boolean} ephemeral Whether or not to send the interaction as ephemeral.
 * @param {MessageActionRow[]} components Array of MessageActionRows.
 * @returns {Promise<void>} A void promise.
 */
export async function fileTipMessage(interaction: CommandInteraction, files: Array<MessageAttachment>, ephemeral?: boolean | false, components?: Array<MessageActionRow> | []): Promise<void> {
    if (random >= 15 && random <= 25) {
        return await interaction.reply({
            content: `**Tip**: ${tip}`,
            files: files,
            ephemeral: ephemeral,
            components: components,
        });
    } else {
        return await interaction.reply({
            files: files,
            ephemeral: ephemeral,
            components: components,
        });
    }
}