import { Client, Guild, Message, TextChannel } from 'discord.js';
import { ticketDataType } from '../typings/configTypes';

export class Ticket {
    private guild: Guild;
    private channel: TextChannel;
    private message: Message<true>;

    private data: ticketDataType;
    private client: Client;

    private isIcomplete = false;
    constructor(client: Client, data: ticketDataType) {
        this.client = client;
        this.data = data;

        this.build();
    }

    private async build() {
        this.guild = this.client.guilds.cache.get(this.data.guild_id);
        if (!this.guild) return this.setImcomplete();

        await this.guild.channels.fetch().catch(() => {});
        this.channel = this.guild.channels.cache.get(this.data.channel_id) as TextChannel;
        if (!this.channel) return this.setImcomplete();

        await this.channel.messages.fetch().catch(() => {});
        this.message = this.channel.messages.cache.get(this.data.message_id);
        if (!this.message) return this.setImcomplete();
    }
    private setImcomplete() {
        this.isIcomplete = true;
        return false;
    }
    public get incomplete() {
        return this.isIcomplete;
    }

    public setState(state: 'open' | 'closed' | 'deleted') {
        this.data.state = state;
        return this.state;
    }
    public get state() {
        return this.data.state;
    }
}
