import { CacheType, CommandInteraction } from "discord.js";
import { Sharpy } from "../../Client";
import { PostulationDesignerEmbed } from "../../Helpers";

export const InfoDesignerEmbedCommand = async ({
    Sharpy,
    interaction
}: {
    Sharpy: Sharpy;
    interaction: CommandInteraction<CacheType>;
}) => {
    const { embed, components } = PostulationDesignerEmbed({ Sharpy });

    await interaction.channel?.send({
        embeds: [embed],
        components
    });

    await interaction.followUp({
        content: "Embed de Información de Diseñador se ha enviado correctamente."
    });
};
