import { CacheType, CommandInteraction } from "discord.js";
import { Sharpy } from "../../Client";
import { ApplicationCriteriaEmbed } from "../../Helpers";
import { Emojis } from "../../Data/Emojis";

export const ApplicationCriteriaCommand = async ({
    Sharpy,
    interaction
}: {
    Sharpy: Sharpy;
    interaction: CommandInteraction<CacheType>;
}) => {
    const { embed } = ApplicationCriteriaEmbed({ Sharpy });

    await interaction.channel?.send({
        embeds: [embed]
    });

    await interaction.followUp({
        content: `${Emojis.Util.Yes} | Embed de Criterios de Postulación enviado correctamente.`
    });
};
