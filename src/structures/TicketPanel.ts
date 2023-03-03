import { CategoryChannel, Client, Guild, Message, TextChannel } from 'discord.js';
import { ticketConfig } from '../typings/configTypes';

export class TicketPanel {
    private _guild: Guild;
    private _channel: TextChannel;
    private _message: Message;
    private _parent: CategoryChannel | null = null;

    private data: ticketConfig;
    private client: Client;

    public complete = true;
    constructor(client: Client, input: ticketConfig) {
        this.data = input;
        this.client = client;

        this.build();
    }
    private async build() {
        this._guild = this.client.guilds.cache.get(this.data.guild_id);
        if (!this._guild) return this.imcomplete();

        await this._guild.channels.fetch().catch(() => {});
        this._channel = this._guild.channels.cache.get(this.data.channel) as TextChannel;
        if (!this._channel) return this.imcomplete();

        await this._channel.messages.fetch().catch(() => {});
        this._message = this._channel.messages.cache.find((x) => x.id === this.data.message_id);
        if (!this._message) return this.imcomplete();

        if (this.data.parent.length > 0) {
            const parent = this._guild.channels.cache.get(this.data.parent) as CategoryChannel;
            if (!parent) return this.imcomplete();
            this._parent = parent;
        }
    }
    private imcomplete() {
        this.complete = false;
        return this.complete;
    }

    public get message() {
        return this._message;
    }
    public get guild() {
        return this._guild;
    }
    public get channel() {
        return this._channel;
    }
    public get parent() {
        return this._parent;
    }
    public get maxTicketsPerPerson() {
        return this.data.maxTicketsPerPerson;
    }
    public get hasModal() {
        return this.data.hasModal;
    }
    public get modalFields() {
        return this.data.modalFields;
    }
    public get modalName() {
        return this.data.modalName;
    }
    public get modIds() {
        return this.data.mod_ids;
    }
    public get subject() {
        return this.data.subject;
    }

    public toJSON() {
        return this.data;
    }
}
