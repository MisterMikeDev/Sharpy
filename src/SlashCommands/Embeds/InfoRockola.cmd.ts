import { CacheType, CommandInteraction } from "discord.js";
import { Sharpy } from "../../Client";
import { InfoRockolaEmbed } from "../../Helpers";

export const InfoRockolaEmbedCommand = async ({
    Sharpy,
    interaction
}: {
    Sharpy: Sharpy;
    interaction: CommandInteraction<CacheType>;
}) => {
    const { embed } = InfoRockolaEmbed({ Sharpy });

    await interaction.channel?.send({
        embeds: [embed]
    });

    await interaction.followUp({
        content: "Embed de la Rockola enviado correctamente."
    });
};
