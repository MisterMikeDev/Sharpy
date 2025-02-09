import { CacheType, CommandInteraction } from "discord.js";
import { Sharpy } from "../../Client";
import { HierarchiesEmbed } from "../../Helpers";
import { Emojis } from "../../Data/Emojis";

export const HierarchiesCommand = async ({
    Sharpy,
    interaction
}: {
    Sharpy: Sharpy;
    interaction: CommandInteraction<CacheType>;
}) => {
    const { embed } = HierarchiesEmbed({ Sharpy });

    await interaction.channel?.send({
        embeds: [embed]
    });

    await interaction.followUp({
        content: `${Emojis.Util.Yes} | Embed de Jerarquías enviado correctamente.`
    });
};
