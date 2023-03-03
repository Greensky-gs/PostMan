import { AmethystClient } from 'amethystjs';
import { Partials } from 'discord.js';
import { config } from 'dotenv';
config();

export const client = new AmethystClient(
    {
        intents: ['Guilds'],
        partials: [Partials.Message]
    },
    {
        token: process.env.token,
        debug: true,
        eventsFolder: './dist/events',
        buttonsFolder: './dist/buttons',
        autocompleteListenersFolder: './dist/autocompletes',
        commandsFolder: './dist/commands',
        preconditionsFolder: './dist/preconditions'
    }
);

client.start({});
