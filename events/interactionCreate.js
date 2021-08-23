module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
		if (interaction.user.bot || !interaction.guild) return;

		if (interaction.isButton()) {console.log('A button interaction was triggered.');}
		if (interaction.inGuild()) {console.log('An interaction was triggered in a guild.');}
		if (interaction.isCommand()) {console.log('A command interaction was triggered.');}
		if (interaction.isMessageComponent()) {console.log('A message component interaction was triggered.');}
		if (interaction.isSelectMenu()) {console.log('A select menu interaction was triggered.');}

		const { spydankers, brocommunity } = interaction.client.config;

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

		if (interaction.isButton() && interaction.guild.id === brocommunity) {
			const roles = {
				BroCommunityAnnouncements: '862489867463426058',
				BroCommunityGiveaways: '862468633724321833',
				BroCommunityEvents: '862468781628850176',
				BroCommunityHeists: '862468613998641152',
				BroCommunityBotUpdates: '862489879502127106',
				BroCommunityDankMemerGiveaways: '876896735715262464',
				BroCommunityDankMemerHeists: '875613785136709642',
				BroCommunityCrimson: '862307659931582464',
				BroCommunityRaspberry: '862307660219809803',
				BroCommunityApricot: '862307661206126613',
				BroCommunityScarlet: '864516405599928350',
				BroCommunityPumpkin: '864516756864499744',
				BroCommunityFire: '862307660505153618',
				BroCommunitySand: '864517904308371457',
				BroCommunityLemon: '862307661605502997',
				BroCommunityAmber: '862307661390675968',
				BroCommunityAsparagus: '863170781914726461',
				BroCommunitySeafoam: '862307662087192577',
				BroCommunityEmerald: '862307662939291648',
				BroCommunityIceberg: '864519101249486879',
				BroCommunityArctic: '862307663408136272',
				BroCommunityStratos: '862307663886286859',
				BroCommunityHeliotrope: '862307664356048916',
				BroCommunityElectric: '862307664649125908',
				BroCommunityGrape: '864519114349477888',
				BroCommunityBlush: '862307664942596116',
				BroCommunityPunch: '864519485104717874',
				BroCommunityFuchsia: '862307665252974593',
				BroCommunityWhiskey: '862307665273946122',
				BroCommunityGravity: '862463669501296640',
				BroCommunityPearl: '862463660551438347',
				BroCommunityEbony: '862463644851896362',
			};

			const role = interaction.guild.roles.cache.get(roles[interaction.customId]);
			if (!role) return;

			try {
				if (interaction.member.roles.cache.get(role.id)) {
					await interaction.member.roles.remove(role.id);
					await interaction.reply({ content: `You have been removed from the ${role} role.`, ephemeral: true });
				} else {
					// The start of the check module.
					const colors = ['862307659931582464', '862307660219809803', '864516405599928350', '862307661206126613', '864516756864499744', '862307660505153618', '862307661390675968', '864517904308371457', '862307661605502997', '862307662087192577', '863170781914726461', '862307662939291648', '862307663408136272', '864519101249486879', '862307663886286859', '862307664356048916', '862307664649125908', '862307664942596116', '864519114349477888', '862307665252974593', '864519485104717874', '862307665273946122', '862463644851896362', '862463669501296640', '862463660551438347'];
					/* for (const mmLol of susb) {
						if (!interaction.member.roles.cache.has(mmLol)) continue;
						else return await interaction.reply({ content: 'You idiot! You can only have one color role..', ephemeral: true });
					} */

					for (const color of colors) {
						if (colors.includes(role.id) && interaction.member.roles.cache.has(color)) return await interaction.reply({ content: 'Test' });
						else continue;
					}

					// End of the checking module.

					await interaction.member.roles.add(role.id);
					await interaction.reply({ content: `You have been added to the ${role} role.`, ephemeral: true });
				}
			} catch (err) {
				// await interaction.reply({ content: 'Something went wrong while attempting to execute this interaction.', ephemeral: true });
				console.error(err);
			}
		}

		try {
			// Global commands.
			if (!interaction.client.globalApplicationCommands.has(interaction.commandName)) return;
			await interaction.client.globalApplicationCommands.get(interaction.commandName).execute(interaction);
		} catch (error) {
			console.error(`[Application Command Interaction] ${error}`);
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	},
};