import { ApplyOptions } from '@sapphire/decorators';
import { Command, CommandOptions } from '@sapphire/framework';
import { Message, MessageActionRow, MessageButton, MessageEmbed } from 'discord.js';
import { Permissions } from 'discord.js';

@ApplyOptions<CommandOptions>({
    description: 'invite me?!'
})
export class UserCommand extends Command {
    public async messageRun(message: Message) {
        const { client } = message;

        const invite = client.generateInvite({
            scopes: ['applications.commands', 'bot'],
            permissions: [Permissions.FLAGS.ADMINISTRATOR]
        });

        const button = new MessageButton().setURL(invite).setLabel('Invite me!').setStyle('LINK');

        const row = new MessageActionRow().addComponents(button);

        const embed = new MessageEmbed()
            .setTitle(client.user!.username)
            .setThumbnail(client.user!.displayAvatarURL({ format: 'png' }))
            .setDescription('Click on the button below to invite me!')
            .setColor('BLURPLE')
            .setFooter(`Total Servers: ${client.guilds.cache.size}`)
            .setTimestamp();

        return message.channel.send({ embeds: [embed], components: [row] });
    }
}
