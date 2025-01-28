import { CacheType, CommandInteraction } from "discord.js";
import { Sharpy } from "../../Client";
import { PartnerEmbed } from "../../Helpers";

export const SendPartnerEmbedCommand = async ({
    Sharpy,
    interaction
}: {
    Sharpy: Sharpy;
    interaction: CommandInteraction<CacheType>;
}) => {
    const { embed } = await PartnerEmbed({ Sharpy });

    await interaction.channel?.send({
        embeds: [embed]
    });

    await interaction.followUp({
        content: "Embed de Partner enviado correctamente."
    });
};
