import { CacheType, CommandInteraction, Message, TextChannel } from "discord.js";
import { Sharpy } from "../../Client";
import { DuelEmbed } from "../../Helpers/Components/Embeds/Duel";
import { Emojis } from "../../Data/Emojis";

export const ShowDuelCommand = async ({
    Sharpy,
    interaction
}: {
    Sharpy: Sharpy;
    interaction: CommandInteraction<CacheType>;
}) => {
    const interactionChannel = interaction.channel as TextChannel;

    const currentDuel = Sharpy.duel.get(interactionChannel.id);

    if (!currentDuel)
        return await interaction.followUp({
            content: `${Emojis.Util.No} | No hay un duelo activo en este canal.`
        });

    try {
        const previousMessageId = currentDuel.messageID;

        const { content, embed, components } = await DuelEmbed(Sharpy, currentDuel);
        const newMessage = await interactionChannel.send({
            content,
            embeds: [embed],
            components
        });

        Sharpy.ChangeDuelMessageId(interactionChannel.id, newMessage.id);

        const messages = await interactionChannel.messages.fetch();
        const previousMessage = messages.find(
            (msg: Message) => msg.id === previousMessageId
        );

        if (previousMessage) await previousMessage.delete().catch(() => {});

        await interaction.followUp({
            content: `${Emojis.Util.Yes} | El mensaje del duelo ha sido reenviado y actualizado.`
        });
    } catch (error) {
        console.error(error);
        await interaction.followUp({
            content: `${Emojis.Util.No} | Ocurrió un error al intentar mostrar el duelo.`
        });
    }
};
