import { CacheType, CommandInteraction, Message, TextChannel } from "discord.js";
import { Sharpy } from "../../Client";
import { QueueEmbed } from "../../Helpers/Components/Embeds/Queue";
import { Emojis } from "../../Data/Emojis";

export const ShowKaraokeCommand = async ({
    Sharpy,
    interaction
}: {
    Sharpy: Sharpy;
    interaction: CommandInteraction<CacheType>;
}) => {
    const interactionChannel = interaction.channel as TextChannel;

    const currentQueue = Sharpy.queue.get(interactionChannel.id);

    if (!currentQueue)
        return await interaction.followUp({
            content: `${Emojis.Util.No} | No hay una lista de karaoke activa en este canal.`
        });

    try {
        const previousMessageId = currentQueue.messageID;

        const { content, embed, components } = QueueEmbed(Sharpy, currentQueue);
        const newMessage = await interactionChannel.send({
            content,
            embeds: [embed],
            components
        });

        await Sharpy.ChangeMessageId(interactionChannel.id, newMessage.id);

        await Sharpy.UpdateQueueInCurrentChannel(interactionChannel.id);

        const messages = await interactionChannel.messages.fetch();
        const previousMessage = messages.find(
            (msg: Message) => msg.id === previousMessageId
        );

        if (previousMessage) await previousMessage.delete().catch(() => {});

        await interaction.followUp({
            content: `${Emojis.Util.Yes} | El mensaje de la lista de karaoke ha sido reenviado y actualizado.`
        });
    } catch (error) {
        console.error(error);
        await interaction.followUp({
            content: `${Emojis.Util.No} | Ocurrió un error al intentar mostrar la lista de karaoke.`
        });
    }
};
