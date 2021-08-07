const { MessageAttachment, MessageEmbed } = require('discord.js');
const sharp = require('sharp');
const { name: getcolor } = require('ntc');

module.exports = {
	name: 'color',
	description: 'Visualize a hex color.',
	options: [{
		name: 'color',
		type: 3,
		description: 'The hex color to display.',
		required: true,
	}],
	async execute(interaction) {
		const match = interaction.options.getString('color', true).match(/#?[a-fA-F0-9]{6}/);
		if (!match) {return await interaction.reply({ content: 'An invalid hex code was provided!' });}

		const query = match[0];
		const hex = query.startsWith('#') ? query.toUpperCase() : '#' + query.toUpperCase();
		const color = getcolor(hex);

		if (color[1].startsWith('Invalid Color')) {return await interaction.reply({ content: 'Something went wrong while parsing your hex code.' });}

		const buf = await sharp(Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 127.14 96.36" height="128" width="128">
            <style>
                .cls-1 { fill: ${hex}; }
            </style>
            <path class="cls-1" d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"/>
        </svg>`))
			.png()
			.toBuffer();

		const file = new MessageAttachment(buf, 'color.png');

		const embed = new MessageEmbed()
			.setThumbnail('attachment://color.png')
			.setColor(hex)
			.setDescription(`**${color[1]}** - \`${hex}\``);
		await interaction.reply({ embeds: [embed], files: [file] });
	},
};