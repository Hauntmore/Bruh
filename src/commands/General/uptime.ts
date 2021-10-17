import { ApplyOptions } from '@sapphire/decorators';
import { Command, CommandOptions } from '@sapphire/framework';
import { send } from '@sapphire/plugin-editable-commands';
import type { Message } from 'discord.js';

@ApplyOptions<CommandOptions>({
    description: 'check the kewl uptime'
})
export class UserCommand extends Command {
    public async messageRun(message: Message) {
        const uptime = Math.round(this.container.client.uptime as number);

        const seconds = (uptime / 1000) % 3600;

        const minutes = seconds / 60;

        const hours = uptime / 3600000;

        const days = uptime / 86400000;

        const content = `Uptime: ${days.toFixed()}d ${hours.toFixed()}h ${minutes.toFixed()}m ${seconds.toFixed()}s`;

        return send(message, content);
    }
}
