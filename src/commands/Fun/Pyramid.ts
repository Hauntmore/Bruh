import { ApplyOptions } from '@sapphire/decorators';
import { Command, CommandOptions, Args } from '@sapphire/framework';
import { send } from '@sapphire/plugin-editable-commands';
import type { Message } from 'discord.js';

@ApplyOptions<CommandOptions>({
    description: 'generate a funny pyramid'
})
export class UserCommand extends Command {
    public pyramid(size: number): string {
        const a = new Array(size)
            .fill('*')
            .map((r: string, i: number) => r.repeat(i + 1).padStart(size));
        return a
            .map(
                (r: string, i: number) =>
                    r + a.map((r) => r.split('').reverse().join('').substring(1))[i]
            )
            .join('\n');
    }

    public async messageRun(message: Message, args: Args) {
        const size = await args.pick('number').catch(() => 5);
        const generation = this.pyramid(size);

        return send(message, `\`\`\`\n${generation}\n\`\`\``);
    }
}
