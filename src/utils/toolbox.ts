import { ButtonStyle, ComponentType, ButtonBuilder, AnyComponentBuilder, ActionRowBuilder } from 'discord.js';

export const buildButton = ({
    disabled = false,
    ...data
}: {
    label?: string;
    url?: string;
    style: keyof typeof ButtonStyle;
    id?: string;
    disabled?: boolean;
    emoji?: string;
    buttonId?: keyof typeof ButtonIds;
}) => {
    const componentData: any = {
        style: ButtonStyle[data.style],
        type: ComponentType.Button,
        disabled
    };

    if (data.label) componentData.label = data.label;
    if (data.emoji) componentData.emoji = data.emoji;
    if (data.url && !data.id) componentData.url = data.url;
    if (data.id && !data.url) componentData.custom_id = data.id;
    if (data.buttonId) componentData.custom_id = ButtonIds[data.buttonId];

    return new ButtonBuilder(componentData);
};
export const row = <T extends AnyComponentBuilder = ButtonBuilder>(...components: T[]): ActionRowBuilder<T> =>
    new ActionRowBuilder().setComponents(components) as ActionRowBuilder<T>;
export enum ButtonIds {
    Yes = 'yes',
    No = 'no'
}
