import { CacheType, CommandInteraction } from "discord.js";
import { Sharpy } from "../../Client";
import { EmbedInfoBoosters } from "../../Helpers";
import { Emojis } from "../../Data/Emojis";

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
        content: `${Emojis.Util.Yes} | Embed de info boosters enviado correctamente.`
    });
};
