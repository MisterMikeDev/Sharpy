import { CacheType, CommandInteraction } from "discord.js";
import { Sharpy } from "../../Client";
import { StaffEventRulesEmbed } from "../../Helpers";
import { Emojis } from "../../Data/Emojis";

export const StaffEventRulesCommand = async ({
    Sharpy,
    interaction
}: {
    Sharpy: Sharpy;
    interaction: CommandInteraction<CacheType>;
}) => {
    const { embed } = StaffEventRulesEmbed({ Sharpy });

    await interaction.channel?.send({
        embeds: [embed]
    });

    await interaction.followUp({
        content: `${Emojis.Util.Yes} | Embed de reglas de eventos para el staff enviado correctamente.`
    });
};
