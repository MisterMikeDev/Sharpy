import { CacheType, CommandInteraction } from "discord.js";
import { Sharpy } from "../../Client";
import { InfoStaffRulesEmbed } from "../../Helpers";

export const InfoStaffRulesCommand = async ({
    Sharpy,
    interaction
}: {
    Sharpy: Sharpy;
    interaction: CommandInteraction<CacheType>;
}) => {
    const { embed } = InfoStaffRulesEmbed({ Sharpy });

    await interaction.channel?.send({
        embeds: [embed]
    });

    await interaction.followUp({
        content: "Embed de Info de Staff enviado correctamente."
    });
};
