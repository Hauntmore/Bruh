import { CommandInteraction, GuildMember } from "discord.js";
import { ClientBase } from "../structures/Client";
import { Event, UserType } from "../types";
import { magenta } from "chalk";
import { contentTipMessage } from "../helpers/Tips";
import { UserModel } from "../models/User";
import prettyms from "pretty-ms";
import { UpdateQuery } from "mongoose";
import { spyDankersGuildId } from "../config/Config";

export = <Event> {
	name: "interactionCreate",
	description: "Emitted when an interaction has been created.",
	async execute(interaction: CommandInteraction, client: ClientBase) {
		console.log(magenta(interaction));

		if (interaction.user.bot || !interaction.guild) return;

        if (interaction.isButton() && interaction.guild.id === spyDankersGuildId) {
			const roles: any = {
				SpydYellow: "768064450241626142",
				SpydWhite: "768065464500617216",
				SpydRed: "768071501424492552",
				SpydPink: "768070887751548999",
				SpydOrange: "768063264663011328",
				SpydLightGreen: "768064713958490130",
				SpydCyan: "762209560877334539",
				SpydDarkBlue: "768061529970442260",
				SpydPurple: "762208885352169472",
				SpydBrown: "768064580491411478",
				SpydDarkGreen: "768061263183740958",
				SpydBlack: "768062001825579028",
				SpydRandom: "768523513299468329",
				SpydMale: "765948765777166426",
				SpydFemale: "765948836240687104",
				SpydAnnouncement: "765574049253294080",
				SpydPartner: "776785459409321994",
				SpydPoll: "765574206632886272",
				SpydNoPartner: "823917297755226154",
				SpydGiveaway: "762216355541549066",
				SpydHeist: "762216420569645058",
				SpydFlashGiveaway: "848500396363481119",
				SpydRaffle: "765949198213447750",
				SpydOutsideHeist: "806078400053379112",
				SpydKarutaPlayer: "882977906157035551",
				SpydBingo: "799738624857473056",
				SpydMudae: "799719390282121236",
				SpydGTN: "800004180105494569",
				SpydBroBot: "859485801053421569",
				SpydOwOAnnouncements: "840309620588281917",
				SpydOwOShop: "839937811993591839",
				SpydOwODistorted: "839888920320933899",
				SpydOwOGiveaway: "840545001939271700",
				SpydMagenta: "817510941079633941",
				SpydLavender: "817511114131767326",
				SpydPeach: "817510357362540595",
				SpydPetalGreen: "817515613131374612",
				SpydBabyBlue: "817510530390294588",
				SpydLemon: "817511001729269782",
				SpydPinky: "868811396580773929",
			};

			const role = interaction.guild.roles.cache.get(roles[interaction.customId]);
			if (!role) return;

			try {
				if ((interaction.member as GuildMember).roles.cache.get(role.id)) {
					await (interaction.member as GuildMember).roles.remove(role.id);
					await interaction.reply({ content: `You have been removed from the ${role} role.`, ephemeral: true });
				} else {
					await (interaction.member as GuildMember).roles.add(role.id);
					await interaction.reply({ content: `You have been added to the ${role} role.`, ephemeral: true });
				}
			} catch (err) {
				await interaction.reply({ content: "Something went wrong while attempting to execute this interaction.", ephemeral: true });
				console.error(err);
			}
		}

		const command = client.commands.get(interaction.commandName);

		if (!command) return;

        let user = await UserModel.findOne({ userID: interaction.user.id });

		if (!user) {
			user = new UserModel({ userID: interaction.user.id });
			user.save();
		}

		if (user.cooldowns[command.name] < Date.now()) {
			await UserModel.findOneAndUpdate({ userID: interaction.user.id }, delete user.cooldowns[command.name] as unknown as UpdateQuery<UserType>);
		}

        let cooldownAmount = (command.cooldown * 1000);

		if (client.owners.includes(interaction.user.id) || client.botModerators.includes(interaction.user.id)) {
			cooldownAmount = (command.cooldown * 0);
		} else if (user.premium) {
			cooldownAmount = (command.cooldown * 1000 / 2);
		}

		if (user.cooldowns[command.name] > Date.now()) {
			const timeleft: string = prettyms(user.cooldowns[command.name] - Date.now());

            return contentTipMessage(interaction, `You are on cooldown! You still have to wait \`${timeleft}\`.`, true);
		}

        if (command.ownerOnly && !client.owners.includes(interaction.user.id)) return contentTipMessage(interaction, "This action is restricted to the bot developers only.", true);

        if (command.botModeratorOnly && !(client.botModerators.includes(interaction.user.id) || client.owners.includes(interaction.user.id))) return contentTipMessage(interaction, "This action is restricted to the bot moderators only.", true);

		try {
			await command.execute(interaction, client);

            user.cooldowns[command.name] = Date.now() + cooldownAmount;
			await UserModel.findOneAndUpdate({ userID: interaction.user.id }, user);
		} catch (error) {
			console.error(error);
			await interaction.reply({ content: `There was an unexpected error while attempting to execute this interaction.\n\`${error.message}\``, ephemeral: true });
		}
	},
};