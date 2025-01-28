import { CacheType, CommandInteraction } from "discord.js";
import { Sharpy } from "../../Client";
import { PostulationPartnersEmbed } from "../../Helpers";

export const InfoPartnerEmbedCommand = async ({
    Sharpy,
    interaction
}: {
    Sharpy: Sharpy;
    interaction: CommandInteraction<CacheType>;
}) => {
    const { embed, components } = PostulationPartnersEmbed({ Sharpy });

    await interaction.channel?.send({
        embeds: [embed],
        components
    });

    await interaction.followUp({
        content: "Embed de Información de Partners se ha enviado correctamente."
    });
};
