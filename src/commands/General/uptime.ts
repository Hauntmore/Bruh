import { ApplyOptions } from '@sapphire/decorators';
import { Command, CommandOptions } from '@sapphire/framework';
import { send } from '@sapphire/plugin-editable-commands';
import { DurationFormatter } from '@sapphire/time-utilities';
import type { Message } from 'discord.js';

@ApplyOptions<CommandOptions>({
    description: 'check the kewl uptime'
})
export class UserCommand extends Command {
    public async messageRun(message: Message) {
        const uptime = Math.round(this.container.client.uptime!);
        const formatted = new DurationFormatter().format(uptime);

        return send(message, { content: `Uptime: ${formatted}` });
    }
}
