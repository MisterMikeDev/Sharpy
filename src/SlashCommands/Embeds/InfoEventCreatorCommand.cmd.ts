import { CacheType, CommandInteraction } from "discord.js";
import { Sharpy } from "../../Client";
import { PostulationEventCreatorEmbed } from "../../Helpers";
import { Emojis } from "../../Data/Emojis";

export const InfoEventCreatorEmbedCommand = async ({
    Sharpy,
    interaction
}: {
    Sharpy: Sharpy;
    interaction: CommandInteraction<CacheType>;
}) => {
    const { embed, components } = PostulationEventCreatorEmbed({ Sharpy });

    await interaction.channel?.send({
        embeds: [embed],
        components
    });

    await interaction.followUp({
        content: `${Emojis.Util.Yes} | Embed de Información de Creador de Eventos se ha enviado correctamente.`
    });
};
