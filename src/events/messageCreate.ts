import { Message, MessageEmbed, TextChannel } from "discord.js";
import { ClientBase } from "../structures/Client";
import { Event } from "../types";
import { AutoResponseModel } from "../models/Autoresponse";
import { bgRed } from "chalk";

export = <Event> {
	name: "messageCreate",
	description: "Emitted whenever a message is created.",
	async execute(message: Message, client: ClientBase) {
        if (!message.guild || message.author.bot || message.partial) return;

        await AutoResponseModel.findOne({ guildID: message.guild.id }, (err: Error, docs: Array<string>) => {
            if (err) console.error(bgRed(err.stack));

            docs.map(async (doc: any) => {
                if (message.content.match(new RegExp(message.content, "gmixs"))) {
                    await (message.channel as TextChannel).send({ content: doc.content });
                }
            });
        });

        const embed = new MessageEmbed()
			.setTitle(`Hello ${message.author.username}!`)
			.setAuthor(client.user.tag, client.user.displayAvatarURL({ dynamic: true, size: 1024 }))
			.setDescription(`Thank you for using me! I am currently powered by **only** application commands.`)
			.setTimestamp()
			.setColor(client.color);

        if (message.content.match(RegExp(`^<@!?${client.user.id}>$`))) message.reply({ embeds: [embed], allowedMentions: { repliedUser: true } });
	},
};