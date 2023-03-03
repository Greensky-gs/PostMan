import { If } from 'discord.js';
import { configValue, ticketDataType } from './configTypes';

export type configs<Raw extends boolean = true> = {
    guild_id: string;
    value: If<Raw, string, configValue<true, false>>;
    tickets: If<Raw, string, ticketDataType[]>;
};
export type supportedLang = 'fr' | 'en';
export type languages = {
    user_id: string;
    lang: supportedLang;
};
