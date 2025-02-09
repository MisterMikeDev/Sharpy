import { CacheType, CommandInteraction } from "discord.js";
import { Sharpy } from "../../Client";
import { PartnerEmbed } from "../../Helpers";
import { Emojis } from "../../Data/Emojis";

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
        content: `${Emojis.Util.Yes} | Embed de Partner enviado correctamente.`
    });
};
