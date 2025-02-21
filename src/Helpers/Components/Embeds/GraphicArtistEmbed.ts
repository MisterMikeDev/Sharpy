import { EmbedBuilder } from "discord.js";
import { Sharpy } from "../../../Client";
import { GraphicArtistsInfo } from "../../../Data/Data";

export const GraphicArtistsEmbed = (Sharpy: Sharpy) => {
    const { title, description, sections, color, image, footer } = GraphicArtistsInfo;
    const desc = `# ${title}\n${description}\n\n${sections
        .map(
            (section) =>
                `> ## **${section.title}**\n${section.list
                    .map((l) => `${section.prefix} ${l}`)
                    .join("\n")}`
        )
        .join("\n\n")}\n${footer}`;

    const embed = new EmbedBuilder()
        .setColor(color)
        .setDescription(desc)
        .setImage(image)
        .setFooter({
            iconURL: Sharpy.user!.displayAvatarURL(),
            text: "Echoes of Talent | Artistas Gráficos"
        });

    return { embed };
};
