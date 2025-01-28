import { EmbedBuilder } from "discord.js";
import { Sharpy } from "../../../Client";
import { GraphicArtistsInfo } from "../../../Data/Data";

export const GraphicArtistsEmbed = (Sharpy: Sharpy) => {
    const color = GraphicArtistsInfo.color;
    const description = `# ${GraphicArtistsInfo.title}\n${GraphicArtistsInfo.description}\n\n${GraphicArtistsInfo.sections
        .map(
            (section) =>
                `> ## **${section.title}**\n${section.list
                    .map((l) => `${section.prefix} ${l}`)
                    .join("\n")}`
        )
        .join("\n\n")}\n${GraphicArtistsInfo.footer}`;

    const embed = new EmbedBuilder()
        .setColor(color)
        .setDescription(description)
        .setFooter({
            iconURL: Sharpy.user!.displayAvatarURL(),
            text: "Echoes of Talent | Artistas Gráficos"
        });

    return { embed };
};
