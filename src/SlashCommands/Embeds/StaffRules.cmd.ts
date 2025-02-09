import { CacheType, CommandInteraction } from "discord.js";
import { Sharpy } from "../../Client";
import { EmbedStaffRules } from "../../Helpers";
import { Emojis } from "../../Data/Emojis";

export const StaffRulesCommand = async ({
    Sharpy,
    interaction
}: {
    Sharpy: Sharpy;
    interaction: CommandInteraction<CacheType>;
}) => {
    const embed = EmbedStaffRules(Sharpy);

    await interaction.channel!.send({ embeds: [embed] });

    await interaction.followUp({
        content: `${Emojis.Util.Yes} | Embed de reglas de staff enviado correctamente.`
    });
};
