import { CacheType, CommandInteraction } from "discord.js";
import { Sharpy } from "../../Client";
import { Tag } from "../../Helpers";
import { Emojis } from "../../Data/Emojis";

export const SendTagCommand = async ({
    interaction,
    message,
    choice
}: {
    Sharpy: Sharpy;
    interaction: CommandInteraction<CacheType>;
    message: string;
    choice: "info" | "success" | "error" | "warning" | "normal";
}) => {
    const { embed } = Tag({ message, type: choice });

    await interaction.channel?.send({ embeds: [embed] });

    await interaction.followUp({
        content: `${Emojis.Util.Yes} | Se ha enviado el embed correctamente.`
    });
};
