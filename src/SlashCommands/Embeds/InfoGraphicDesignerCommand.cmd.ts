import { CacheType, CommandInteraction } from "discord.js";
import { Sharpy } from "../../Client";
import { PostulationGraphicDesignerEmbed } from "../../Helpers";
import { Emojis } from "../../Data/Emojis";

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
        content: `${Emojis.Util.Yes} | Embed de Información de Diseñador Gráfico se ha enviado correctamente.`
    });
};
