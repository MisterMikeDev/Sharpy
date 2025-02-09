import { CacheType, CommandInteraction } from "discord.js";
import { Sharpy } from "../../Client";
import { InfoApeal } from "../../Helpers";
import { Emojis } from "../../Data/Emojis";

export const InfoApealCommand = async ({
    Sharpy,
    interaction
}: {
    Sharpy: Sharpy;
    interaction: CommandInteraction<CacheType>;
}) => {
    const { embed } = InfoApeal({ Sharpy });

    await interaction.channel?.send({
        embeds: [embed]
    });

    await interaction.followUp({
        content: `${Emojis.Util.Yes} | Embed de información de apelaciones enviado.`
    });
};
