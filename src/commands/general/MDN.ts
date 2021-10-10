import fetch from "node-fetch";
import { CommandInteraction, Formatters, MessageEmbed } from "discord.js";
import { Command } from "../../types";
import { contentTipMessage } from "../../helpers/Tips";
import { ClientBase } from "../../structures/Client";

export = <Command> {
	name: "mdn",
	description: "Search the official MDN documentation.",
	usage: "<--query> [--target]",
	options: [
		{
			name: "query",
			type: 3,
			description: "The query to search for in the docs.",
			required: true,
		},
		{
			name: "target",
			description: "The user to mention.",
			type: 6,
			required: false,
		},
	],
	ownerOnly: false,
    adminOnly: false,
	cooldown: 10,
	async execute(interaction: CommandInteraction, client: ClientBase) {
        const text = interaction.options.getString("query", true);

        const base = "https://developer.mozilla.org";

        const uri = `${base}/api/v1/search?q=${encodeURIComponent(text)}&locale=en-US`;

        const fetchedData = await fetch(uri);

        const docs = await fetchedData.json();

        if (!docs) return contentTipMessage(interaction, `The key \`${text}\` was not found on the documentation.`, true);

        const { documents } = docs;

        for (const { mdn_url, title, summary, locale } of documents) {
            const embed = new MessageEmbed()
                .setTitle(`MDN Web Docs: ${title}`)
                .setURL(base + mdn_url)
                .setAuthor(client.user.tag, client.user.displayAvatarURL({ dynamic: true }))
                .setThumbnail("https://avatars.githubusercontent.com/u/7565578?s=200&v=4")
                .setDescription(`${summary.replace(/(\r\n|\n|\r)/gm, "")}\n\n**Locale**: \`${locale}\`\n**Resource**: [\`Link\`](${base}${mdn_url})`);

            try {
                if (interaction.options.getUser("target", false)) return await interaction.reply({ content: `${client.customEmojis.bookmark} ${Formatters.bold(`Documentation Suggestion for ${interaction.options.getUser("target", false)} from ${interaction.user.toString()}:`)}`, embeds: [embed], allowedMentions: { parse: ["users"] } });
                else return await interaction.reply({ embeds: [embed] });
            } catch (err) {
                await interaction.reply({ content: "There was an error parsing your query.\n" + err.message, ephemeral: true });
                console.error(err.stack);
            }
        }
	},
};