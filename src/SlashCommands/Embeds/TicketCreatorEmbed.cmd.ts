import { CacheType, CommandInteraction } from "discord.js";
import { Sharpy } from "../../Client";
import { TicketsMainEmbed } from "../../Helpers";

export const TicketsCreatedCommand = async ({
    Sharpy,
    interaction
}: {
    Sharpy: Sharpy;
    interaction: CommandInteraction<CacheType>;
}) => {
    const { embed, components } = TicketsMainEmbed(Sharpy);

    await interaction.channel?.send({
        embeds: [embed],
        components
    });

    await interaction.followUp({
        content: "Enviado."
    });
};
