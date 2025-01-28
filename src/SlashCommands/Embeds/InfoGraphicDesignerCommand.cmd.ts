import { CacheType, CommandInteraction } from "discord.js";
import { Sharpy } from "../../Client";
import { PostulationGraphicDesignerEmbed } from "../../Helpers";

export const InfoGraphicDesignerEmbedCommand = async ({
    Sharpy,
    interaction
}: {
    Sharpy: Sharpy;
    interaction: CommandInteraction<CacheType>;
}) => {
    const { embed, components } = PostulationGraphicDesignerEmbed({ Sharpy });

    await interaction.channel?.send({
        embeds: [embed],
        components
    });

    await interaction.followUp({
        content: "Embed de Información de Diseñador Gráfico se ha enviado correctamente."
    });
};
