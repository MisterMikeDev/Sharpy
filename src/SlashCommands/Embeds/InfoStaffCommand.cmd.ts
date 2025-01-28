import { CacheType, CommandInteraction } from "discord.js";
import { Sharpy } from "../../Client";
import { PostulationStaffEmbed } from "../../Helpers";

export const InfoStaffEmbedCommand = async ({
    Sharpy,
    interaction
}: {
    Sharpy: Sharpy;
    interaction: CommandInteraction<CacheType>;
}) => {
    const { embed, components } = PostulationStaffEmbed({ Sharpy });

    await interaction.channel?.send({
        embeds: [embed],
        components
    });

    await interaction.followUp({
        content: "Embed de Información de Staff se ha enviado correctamente."
    });
};
