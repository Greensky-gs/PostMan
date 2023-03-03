import { AmethystEvent } from 'amethystjs';
import { ConfigsManager } from '../structures/ConfigManager';
import { ActivityType } from 'discord.js';
import { checkDatabase } from '../utils/database';
import { Languages } from '../structures/Languages';

export default new AmethystEvent('ready', async (client) => {
    await checkDatabase();
    client.configManager = new ConfigsManager(client);
    client.langs = new Languages();

    client.user.setActivity({
        name: 'le courrier',
        type: ActivityType.Watching
    });
});

declare module 'discord.js' {
    interface Client {
        configManager: ConfigsManager;
        langs: Languages;
    }
}
