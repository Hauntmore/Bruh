module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
		if (interaction.user.bot || !interaction.guild) return;

		if (interaction.isButton()) {console.log('A button interaction was triggered.');}
		if (interaction.inGuild()) {console.log('An interaction was triggered in a guild.');}
		if (interaction.isCommand()) {console.log('A command interaction was triggered.');}
		if (interaction.isMessageComponent()) {console.log('A message component interaction was triggered.');}
		if (interaction.isSelectMenu()) {console.log('A select menu interaction was triggered.');}

		const { spydankers } = interaction.client.config;

		if (interaction.isButton() && interaction.guild.id === spydankers) {
			const roles = {
				SpydYellow: '768064450241626142',
				SpydWhite: '768065464500617216',
				SpydRed: '768071501424492552',
				SpydPink: '768070887751548999',
				SpydOrange: '768063264663011328',
				SpydLightGreen: '768064713958490130',
				SpydCyan: '762209560877334539',
				SpydDarkBlue: '768061529970442260',
				SpydPurple: '762208885352169472',
				SpydBrown: '768064580491411478',
				SpydDarkGreen: '768061263183740958',
				SpydBlack: '768062001825579028',
				SpydRandom: '768523513299468329',
				SpydMale: '765948765777166426',
				SpydFemale: '765948836240687104',
				SpydAnnouncement: '765574049253294080',
				SpydPartner: '776785459409321994',
				SpydPoll: '765574206632886272',
				SpydNoPartner: '823917297755226154',
				SpydGiveaway: '762216355541549066',
				SpydHeist: '762216420569645058',
				SpydFlashGiveaway: '848500396363481119',
				SpydRaffle: '765949198213447750',
				SpydOutsideHeist: '806078400053379112',
				SpydBingo: '799738624857473056',
				SpydMudae: '799719390282121236',
				SpydGTN: '800004180105494569',
				SpydBroBot: '859485801053421569',
				SpydOwOAnnouncements: '840309620588281917',
				SpydOwOShop: '839937811993591839',
				SpydOwODistorted: '839888920320933899',
				SpydOwOGiveaway: '840545001939271700',
				SpydMagenta: '817510941079633941',
				SpydLavender: '817511114131767326',
				SpydPeach: '817510357362540595',
				SpydPetalGreen: '817515613131374612',
				SpydBabyBlue: '817510530390294588',
				SpydLemon: '817511001729269782',
				SpydPinky: '868811396580773929',
			};

			const role = interaction.guild.roles.cache.get(roles[interaction.customId]);
			if (!role) return;

			try {
				if (interaction.member.roles.cache.get(role.id)) {
					await interaction.member.roles.remove(role.id);
					await interaction.reply({ content: `You have been removed from the ${role} role.`, ephemeral: true });
				} else {
					await interaction.member.roles.add(role.id);
					await interaction.reply({ content: `You have been added to the ${role} role.`, ephemeral: true });
				}
			} catch (err) {
				await interaction.reply({ content: 'Something went wrong while attempting to execute this interaction.', ephemeral: true });
				console.error(err);
			}
		}

		// Global commands.
		if (!interaction.client.globalApplicationCommands.has(interaction.commandName)) return;

		try {
			await interaction.client.globalApplicationCommands.get(interaction.commandName).execute(interaction);
		} catch (error) {
			console.error(`[Application Interaction] ${error}`);
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}

		// Guild commands.
		if (!interaction.client.guildApplicationCommands.has(interaction.commandName)) return;

		try {
			await interaction.client.guildApplicationCommands.get(interaction.commandName).execute(interaction);
		} catch (error) {
			console.error(`[Application Interaction] ${error}`);
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	},
};
