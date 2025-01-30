import { EmbedBuilder } from "discord.js";
import { Sharpy } from "../../../Client";
import { SharpyInfoData } from "../../../Data/Data";

export const SharpyInfo = ({ Sharpy }: { Sharpy: Sharpy }) => {
    const { title, description, color, sections, footer, emojiNumbers } = SharpyInfoData;

    function TransformStringNumbersToEmojis(string: string): string {
        return string.replace(/\$\d\$/g, (match) => {
            const key = match;
            return emojiNumbers[key] || match;
        });
    }

    const des = `${title}\n\n${description}\n\n${sections
        .map(({ title, fields }, index) => {
            return `> ## $${index + 1}$${title}\n${fields
                .map((field) => {
                    return `## ${field.name}\n${field.values.map((value) => `${field.prefix}${value}`).join("\n")}`;
                })
                .join("\n\n")}`;
        })
        .join("\n\n")}\n\n> ${footer}`;

    const embed = new EmbedBuilder()
        .setDescription(TransformStringNumbersToEmojis(des))
        .setColor(color)
        .setFooter({
            text: "Echoes Of Talent | Información de Sharpy",
            iconURL: Sharpy.user!.displayAvatarURL()
        });

    return { embed };
};
