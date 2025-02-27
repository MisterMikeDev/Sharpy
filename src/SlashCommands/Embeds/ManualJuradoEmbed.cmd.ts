import { CacheType, CommandInteraction } from "discord.js";
import { Sharpy } from "../../Client";
import { ManualEmbed } from "../../Helpers";
import { Emojis } from "../../Data/Emojis";

export const ManualJuradoEmbedCommand = async ({
    Sharpy,
    interaction
}: {
    Sharpy: Sharpy;
    interaction: CommandInteraction<CacheType>;
}) => {
    const { embed } = ManualEmbed({ Sharpy });

    await interaction.channel?.send({
        embeds: [embed]
    });

    await interaction.followUp({
        content: `${Emojis.Util.Yes} | Embed de Manual de Jurado enviado correctamente.`
    });
};
