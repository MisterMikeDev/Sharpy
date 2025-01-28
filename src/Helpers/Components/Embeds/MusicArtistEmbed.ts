import { EmbedBuilder } from "discord.js";
import { Sharpy } from "../../../Client";
import { MusicArtistsInfo } from "../../../Data/Data";

export const MusicArtistsEmbed = (Sharpy: Sharpy) => {
    const color = MusicArtistsInfo.color;
    const description = `# ${MusicArtistsInfo.title}\n${MusicArtistsInfo.description}\n\n${MusicArtistsInfo.sections
        .map(
            (section) =>
                `> ## **${section.title}**\n${section.list
                    .map((l) => `${section.prefix} ${l}`)
                    .join("\n")}`
        )
        .join("\n\n")}\n${MusicArtistsInfo.footer}`;

    const embed = new EmbedBuilder()
        .setColor(color)
        .setDescription(description)
        .setFooter({
            iconURL: Sharpy.user!.displayAvatarURL(),
            text: "Echoes of Talent | Artistas Musicales"
        });

    return { embed };
};
