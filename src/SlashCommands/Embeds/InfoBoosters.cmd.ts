import { CacheType, CommandInteraction } from "discord.js";
import { Sharpy } from "../../Client";
import { EmbedInfoBoosters } from "../../Helpers";

export const InfoRulesCommand = async ({
    Sharpy,
    interaction
}: {
    Sharpy: Sharpy;
    interaction: CommandInteraction<CacheType>;
}) => {
    const embed = EmbedInfoBoosters(Sharpy);

    await interaction.channel!.send({ embeds: [embed] });

    await interaction.followUp({
        content: "Se ha enviado el mensaje correctamente."
    });
};
