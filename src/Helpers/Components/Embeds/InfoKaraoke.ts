import { EmbedBuilder } from "discord.js";
import { Sharpy } from "../../../Client";
import { InfoKaraokeData } from "../../../Data/Data";

export const InfoKaraoke = ({ Sharpy }: { Sharpy: Sharpy }) => {
    const { title, description, color, sections } = InfoKaraokeData;

    const des = `# ${title}\n\n${description}\n\n${sections
        .map(({ title, description, prefix: pre, fields }) => {
            return `> ## ${pre}${title}\n${description}\n${fields
                .map((field) => {
                    return `## ${field.name}\n${field.values.map((value) => `${field.prefix}${value}`).join("\n")}`;
                })
                .join("\n\n")}`;
        })
        .join("\n\n")}`;

    const embed = new EmbedBuilder().setDescription(des).setColor(color).setFooter({
        text: "Echoes Of Talent | Información de Karaoke",
        iconURL: Sharpy.user!.displayAvatarURL()
    });

    return { embed };
};
