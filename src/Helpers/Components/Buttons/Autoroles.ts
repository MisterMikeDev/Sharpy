import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";
import { ColorData, HobbiesData, MusicGenreData } from "../../../Data/Data";

function generateActionRows(
    data: Array<{ label: string; emoji: string; buttonId: string }>
) {
    const actionRows: ActionRowBuilder<ButtonBuilder>[] = [];
    for (let i = 0; i < data.length; i += 5) {
        const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
            data
                .slice(i, i + 5)
                .map((item) =>
                    new ButtonBuilder()
                        .setCustomId(item.buttonId)
                        .setLabel(item.label)
                        .setEmoji(item.emoji)
                        .setStyle(ButtonStyle.Secondary)
                )
        );
        actionRows.push(row);
    }
    return actionRows;
}

export const ColorActionRows = generateActionRows(ColorData);
export const HobbiesActionRows = generateActionRows(HobbiesData);
export const MusicGenreActionRows = generateActionRows(MusicGenreData);
