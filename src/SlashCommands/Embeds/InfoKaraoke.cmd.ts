import { CacheType, CommandInteraction } from "discord.js";
import { Sharpy } from "../../Client";
import { InfoKaraoke } from "../../Helpers";

export const InfoKaraokeCommand = async ({
    Sharpy,
    interaction
}: {
    Sharpy: Sharpy;
    interaction: CommandInteraction<CacheType>;
}) => {
    const { embed } = InfoKaraoke({ Sharpy });

    await interaction.channel?.send({
        embeds: [embed]
    });

    await interaction.followUp({
        content: "Embed de información de Karaoke enviado."
    });
};
