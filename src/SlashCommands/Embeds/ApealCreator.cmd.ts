import { CacheType, CommandInteraction } from "discord.js";
import { Sharpy } from "../../Client";
import { CreateApealEmbed } from "../../Helpers";
import { Emojis } from "../../Data/Emojis";

export const ApealCreatorCommand = async ({
    Sharpy,
    interaction
}: {
    Sharpy: Sharpy;
    interaction: CommandInteraction<CacheType>;
}) => {
    const { embed, components } = CreateApealEmbed({ Sharpy });

    await interaction.channel?.send({
        embeds: [embed],
        components
    });

    await interaction.followUp({
        content: `${Emojis.Util.Yes} | Embed del creador de apelaciones enviado correctamente.`
    });
};
