import { AmethystCommand } from 'amethystjs';
import { commandNames } from '../data/contents';
import { ApplicationCommandOptionType } from 'discord.js';
import { supportedLang } from '../typings/tables';

export default new AmethystCommand({
    name: commandNames.lang.en.name,
    nameLocalizations: {
        fr: commandNames.lang.fr.name
    },
    description: commandNames.lang.en.description,
    descriptionLocalizations: {
        fr: commandNames.lang.fr.description
    },
    options: [
        {
            name: commandNames.lang.en.options.lang.name,
            nameLocalizations: {
                fr: commandNames.lang.fr.options.lang.name
            },
            description: commandNames.lang.en.options.lang.description,
            descriptionLocalizations: {
                fr: commandNames.lang.fr.options.lang.description
            },
            type: ApplicationCommandOptionType.String,
            required: true,
            choices: [
                {
                    name: commandNames.lang.en.options.lang.choices.french,
                    nameLocalizations: {
                        fr: commandNames.lang.fr.options.lang.choices.french
                    },
                    value: 'fr'
                },
                {
                    name: commandNames.lang.en.options.lang.choices.english,
                    nameLocalizations: {
                        fr: commandNames.lang.fr.options.lang.choices.english
                    },
                    value: 'en'
                }
            ]
        }
    ]
}).setChatInputRun(async ({ interaction, options }) => {
    interaction.client.langs.setLang(
        interaction.user.id,
        options.getString(commandNames.lang.en.options.lang.name) as supportedLang
    );
    interaction.reply({
        embeds: [interaction.client.langs.embed(interaction.user.id, 'lang')(interaction.user)]
    });
});
