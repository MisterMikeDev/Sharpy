import { CacheType, CommandInteraction } from "discord.js";
import { Sharpy } from "../../Client";
import { PostulationMusicArtistEmbed } from "../../Helpers";
import { Emojis } from "../../Data/Emojis";

export const InfoMusicArtistEmbedCommand = async ({
    Sharpy,
    interaction
}: {
    Sharpy: Sharpy;
    interaction: CommandInteraction<CacheType>;
}) => {
    const { embed, components } = PostulationMusicArtistEmbed({ Sharpy });

    await interaction.channel?.send({
        embeds: [embed],
        components
    });

    await interaction.followUp({
        content: `${Emojis.Util.Yes} | Embed de Información de Creador de Eventos se ha enviado correctamente.`
    });
};
