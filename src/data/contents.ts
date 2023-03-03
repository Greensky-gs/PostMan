import { EmbedBuilder, User } from 'discord.js';
import { buildButton } from '../utils/toolbox';

const baseEmbed = (user: User) => {
    return new EmbedBuilder().setTimestamp().setFooter({
        text: user.username,
        iconURL: user.displayAvatarURL({ forceStatic: false })
    });
};
export const buttons = {
    yes: {
        fr: buildButton({
            label: 'Oui',
            buttonId: 'Yes',
            style: 'Success'
        }),
        en: buildButton({
            label: 'Yes',
            buttonId: 'Yes',
            style: 'Success'
        })
    },
    no: {
        fr: buildButton({
            label: 'Non',
            buttonId: 'No',
            style: 'Danger'
        }),
        en: buildButton({
            label: 'No',
            buttonId: 'No',
            style: 'Danger'
        })
    }
};
export const embeds = {
    lang: {
        fr: (user: User) =>
            baseEmbed(user)
                .setTitle('Langue configurée')
                .setDescription(`La langue a été configurée sur **français**`)
                .setColor('#00ff00'),
        en: (user: User) =>
            baseEmbed(user).setTitle('Language set').setDescription(`Language set to **english**`).setColor('#00ff00')
    }
};
export const commandNames = {
    lang: {
        fr: {
            name: 'language',
            description: 'Configure la langue du bot',
            options: {
                lang: {
                    name: 'langue',
                    description: 'Langue à configurer',
                    choices: {
                        french: 'Français',
                        english: 'Anglais'
                    }
                }
            }
        },
        en: {
            name: 'language',
            description: 'Config the language of the bot',
            options: {
                lang: {
                    name: 'lang',
                    description: 'Lang to set to the bot',
                    choices: {
                        french: 'French',
                        english: 'English'
                    }
                }
            }
        }
    }
};
