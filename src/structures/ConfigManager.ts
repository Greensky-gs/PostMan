import { Client, Collection } from 'discord.js';
import { configValue } from '../typings/configTypes';
import { query } from '../utils/database';
import { DatabaseTables } from '../typings/database';
import { TicketPanel } from './TicketPanel';
import { configs } from '../typings/tables';

export class ConfigsManager {
    private client: Client;
    private cache: Collection<string, configValue<false, true>> = new Collection();
    constructor(client: Client) {
        this.client = client;

        this.start();
    }

    private start() {
        this.fillCache();
    }
    private async fillCache() {
        await this.client.guilds.fetch();

        const datas = await query<configs>(`SELECT * FROM ${DatabaseTables.Configs}`);
        datas.forEach((data) => {
            const config = JSON.parse(data.value) as configValue<false, false>;
            const tickets = config.tickets.map((t) => new TicketPanel(this.client, t));

            this.cache.set(data.guild_id, {
                ...config,
                tickets: tickets
            });
        });
    }
}
