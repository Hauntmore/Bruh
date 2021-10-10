import { CommandInteraction, MessageEmbed } from "discord.js";
import { ClientBase } from "../../structures/Client";
import { Command } from "../../types";
import fetch from "node-fetch";

export = <Command> {
	name: "covid",
	description: "View the Covid19 statistics for a country or globally.",
	usage: "<--country>",
    options: [
        {
            name: "country",
            type: 3,
            description: "The country to view stats on.",
            required: false,
        },
    ],
	cooldown: 1,
	async execute(interaction: CommandInteraction, client: ClientBase) {
        const country = interaction.options.getString("country", false);

        if (!country) {
            const res = await (await fetch("https://disease.sh/v3/covid-19/all")).json();

            const embed = new MessageEmbed()
                .setTitle("Global Covid-19 Statistics")
                .setThumbnail("https://images.pexels.com/photos/87651/earth-blue-planet-globe-planet-87651.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500")
                .addFields(
                    { name: "**Cases**:", value: `${res.cases.toLocaleString()}`, inline: true },
                    { name: "**Today's Cases**", value: `${res.todayCases.toLocaleString()}`, inline: true },
                    { name: "**Deaths**:", value: `${res.deaths.toLocaleString()}`, inline: true },
                    { name: "**Today's Deaths**:", value: `${res.todayDeaths.toLocaleString()}`, inline: true },
                    { name: "**Recovered**:", value: `${res.recovered.toLocaleString()}`, inline: true },
                    { name: "**Recovered Today**:", value: `${res.todayRecovered.toLocaleString()}`, inline: true },
                    { name: "**Active Cases**:", value: `${res.active.toLocaleString()}`, inline: true },
                    { name: "**Tests**:", value: `${res.tests.toLocaleString()}`, inline: true },
                    { name: "**Tests per 1,000,000**:", value: `${res.testsPerOneMillion.toLocaleString()}`, inline: true },
                )
                .setFooter(`${client.user.tag} is coughing extremely hard ${client.customEmojis.flushed}`);

            await interaction.reply({ embeds: [embed] });
        } else if (country) {
            const res = await (await fetch("https://disease.sh/v3/covid-19/countries/" + country)).json();
    
            if (res.message === "Country not found or doesn't have any cases") return await interaction.reply({ content: "This country does not exist or has no cases on record.", ephemeral: true });
            
            const embed = new MessageEmbed()
                .setTitle(`Covid19 Statistics for ${res.country}`)
                .setThumbnail(res.countryInfo.flag)
                .setDescription(`Contintent: **${res.continent}** ~ Total Population: **${res.population.toLocaleString()}**`)
                .addFields(
                    { name: "**Cases**:", value: `${res.cases.toLocaleString()}`, inline: true },
                    { name: "**Today's Cases**", value: `${res.todayCases.toLocaleString()}`, inline: true },
                    { name: "**Deaths**:", value: `${res.deaths.toLocaleString()}`, inline: true },
                    { name: "**Today's Deaths**:", value: `${res.todayDeaths.toLocaleString()}`, inline: true },
                    { name: "**Recovered**:", value: `${res.recovered.toLocaleString()}`, inline: true },
                    { name: "**Recovered Today**:", value: `${res.todayRecovered.toLocaleString()}`, inline: true },
                    { name: "**Active Cases**:", value: `${res.active.toLocaleString()}`, inline: true },
                    { name: "**Tests**:", value: `${res.tests.toLocaleString()}`, inline: true },
                    { name: "**Tests per 1,000,000**:", value: `${res.testsPerOneMillion.toLocaleString()}`, inline: true },
                )
                .setFooter(`${interaction.user.tag} is sneezing ${client.customEmojis.flushed}`);
    
            await interaction.reply({ embeds: [embed] });
        }
	},
};