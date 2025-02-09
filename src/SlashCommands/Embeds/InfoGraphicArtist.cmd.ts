import { CacheType, CommandInteraction } from "discord.js";
import { Sharpy } from "../../Client";
import { GraphicArtistsEmbed } from "../../Helpers";
import { Emojis } from "../../Data/Emojis";

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
        content: `${Emojis.Util.Yes} | Embed de Artistas Gráficos enviado correctamente.`
    });
};
