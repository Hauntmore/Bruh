import './lib/setup';

import { BucketScope, SapphireClient } from '@sapphire/framework';
import { envParseArray } from '#util/env-parser';

const client = new SapphireClient({
    defaultPrefix: 'beta ',
    caseInsensitiveCommands: true,
    defaultCooldown: {
        delay: 2000,
        scope: BucketScope.User,
        filteredUsers: envParseArray('OWNERS')
    },
    intents: [
        'GUILDS',
        'GUILD_MEMBERS',
        'GUILD_BANS',
        'GUILD_EMOJIS_AND_STICKERS',
        'GUILD_VOICE_STATES',
        'GUILD_MESSAGES',
        'GUILD_MESSAGE_REACTIONS',
        'DIRECT_MESSAGES',
        'DIRECT_MESSAGE_REACTIONS'
    ],
    presence: {
        activities: [
            {
                name: 'you',
                type: 'WATCHING'
            }
        ],
        status: 'online'
    }
});

const main = async () => {
    try {
        client.logger.info('Logging in...');
        await client.login();
        client.logger.info(`Logged in as ${client.user!.tag}.`);
    } catch (error) {
        client.logger.fatal(error);
        client.destroy();
        process.exit(1);
    }
};

void main();
