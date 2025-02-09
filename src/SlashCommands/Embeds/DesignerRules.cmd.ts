import { CacheType, CommandInteraction } from "discord.js";
import { Sharpy } from "../../Client";
import { DesignerRulesEmbed } from "../../Helpers";
import { Emojis } from "../../Data/Emojis";

export const DesignerRulesCommand = async ({
    Sharpy,
    interaction
}: {
    Sharpy: Sharpy;
    interaction: CommandInteraction<CacheType>;
}) => {
    const { embed } = DesignerRulesEmbed({ Sharpy });

    await interaction.channel?.send({
        embeds: [embed]
    });

    await interaction.followUp({
        content: `${Emojis.Util.Yes} | Embed de Reglas de Diseñadores enviado correctamente.`
    });
};
