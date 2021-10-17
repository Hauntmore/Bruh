process.env.NODE_ENV ??= 'development';

import '@sapphire/plugin-editable-commands/register';

import { join } from 'path';
import { config } from 'dotenv';

config({ path: join(__dirname, '..', '..', '.env') });
