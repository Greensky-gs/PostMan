import { If, TextInputStyle } from 'discord.js';
import { TicketPanel } from '../structures/TicketPanel';

export type ticketConfig = {
    guild_id: string;
    channel: string;
    message_id: string;
    maxTicketsPerPerson: number;
    subject: string;
    mod_ids: string[];
    hasModal: boolean;
    modalFields: { label: string; placeholder: string; style: TextInputStyle; value: string; required: boolean }[];
    modalName: string;
    parent: string;
};
export type configValue<Raw extends boolean = true, Instancied extends boolean = false> = {
    guild_id: string;
    tickets: If<Raw, string, If<Instancied, TicketPanel[], ticketConfig[]>>;
    logs_channel_id: string;
    logs_enable: If<Raw, string, boolean>;
    ticket_parent: string;
    mod_ids: If<Raw, string, string[]>;
};
export type ticketDataType = {
    guild_id: string;
    channel_id: string;
    message_id: string;
    openBy: string;
    openedAt: number;
    accessedBy: string[];
    state: 'open' | 'closed' | 'deleted';
};
