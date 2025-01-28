import { CacheType, CommandInteraction } from "discord.js";
import { Sharpy } from "../../Client";
import { ManualEventEmbed } from "../../Helpers";

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
        content: "Embed del Manual de Eventos enviado correctamente."
    });
};
