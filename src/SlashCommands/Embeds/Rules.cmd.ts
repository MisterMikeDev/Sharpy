import { CacheType, CommandInteraction } from "discord.js";
import { Sharpy } from "../../Client";
import { CreateEmbedRules } from "../../Helpers";
import { Emojis } from "../../Data/Emojis";

export const RulesCommand = async ({
    Sharpy,
    interaction
}: {
    Sharpy: Sharpy;
    interaction: CommandInteraction<CacheType>;
}) => {
    const { embed } = CreateEmbedRules({ Sharpy });

    await interaction.channel?.send({ embeds: [embed] });

    await interaction.followUp({
        content: `${Emojis.Util.Yes} | Se ha enviado el embed de reglas correctamente.`
    });
};
