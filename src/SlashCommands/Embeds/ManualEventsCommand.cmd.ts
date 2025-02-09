import { CacheType, CommandInteraction } from "discord.js";
import { Sharpy } from "../../Client";
import { ManualEventEmbed } from "../../Helpers";
import { Emojis } from "../../Data/Emojis";

export const ManualEventEmbedCommand = async ({
    Sharpy,
    interaction
}: {
    Sharpy: Sharpy;
    interaction: CommandInteraction<CacheType>;
}) => {
    const { embed, file } = ManualEventEmbed({ Sharpy });

    await interaction.channel?.send({
        embeds: [embed]
    });

    await interaction.channel?.send({
        files: file
    });

    await interaction.followUp({
        content: `${Emojis.Util.Yes} | Embed del Manual de Eventos enviado correctamente.`
    });
};
