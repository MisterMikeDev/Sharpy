import { CacheType, CommandInteraction } from "discord.js";
import { Sharpy } from "../../Client";
import { SharpyInfo } from "../../Helpers";

export const SharpyInfoCommand = async ({
    Sharpy,
    interaction
}: {
    Sharpy: Sharpy;
    interaction: CommandInteraction<CacheType>;
}) => {
    const { embed } = SharpyInfo({ Sharpy });

    await interaction.channel?.send({
        embeds: [embed]
    });

    await interaction.followUp({
        content: "Embed de información de Sharpy enviado."
    });
};
