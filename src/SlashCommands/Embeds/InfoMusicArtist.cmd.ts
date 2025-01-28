import { CacheType, CommandInteraction } from "discord.js";
import { Sharpy } from "../../Client";
import { MusicArtistsEmbed } from "../../Helpers";

export const InfoBeMusicArtistEmbedCommand = async ({
    Sharpy,
    interaction
}: {
    Sharpy: Sharpy;
    interaction: CommandInteraction<CacheType>;
}) => {
    const { embed } = MusicArtistsEmbed(Sharpy);

    await interaction.channel?.send({
        embeds: [embed]
    });

    await interaction.followUp({
        content: "Embed de Artistas Musicales enviado correctamente."
    });
};
