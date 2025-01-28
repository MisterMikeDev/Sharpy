import { CacheType, CommandInteraction } from "discord.js";
import { Sharpy } from "../../Client";
import { GraphicArtistsEmbed } from "../../Helpers";

export const InfoGraphicArtistEmbedCommand = async ({
    Sharpy,
    interaction
}: {
    Sharpy: Sharpy;
    interaction: CommandInteraction<CacheType>;
}) => {
    const { embed } = GraphicArtistsEmbed(Sharpy);

    await interaction.channel?.send({
        embeds: [embed]
    });

    await interaction.followUp({
        content: "Embed de Artistas Gráficos enviado correctamente."
    });
};
