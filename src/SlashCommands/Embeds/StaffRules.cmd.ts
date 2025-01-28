import { CacheType, CommandInteraction } from "discord.js";
import { Sharpy } from "../../Client";
import { EmbedStaffRules } from "../../Helpers";

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
        content: "Embed de reglas de staff enviado correctamente."
    });
};
