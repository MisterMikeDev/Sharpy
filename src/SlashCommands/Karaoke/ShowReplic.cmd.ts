import { CacheType, CommandInteraction, TextChannel } from "discord.js";
import { Sharpy } from "../../Client";
import { Db } from "../../Helpers/Db/Replic";
import { ReplicEmbed } from "../../Helpers";
import { Emojis } from "../../Data/Emojis";

export const ShowReplicCommand = async ({
    Sharpy,
    interaction
}: {
    Sharpy: Sharpy;
    interaction: CommandInteraction<CacheType>;
}) => {
    const interactionChannel = interaction.channel! as TextChannel;

    const replic = await Db.GetReplicByChannel(Sharpy, interactionChannel.id);

    if (!replic)
        return await interaction.followUp({
            content: `${Emojis.Util.No} | No hay una réplica activa en este canal.`
        });

    try {
        const previousMessageId = replic.messageId;

        const { content, embed, components } = await ReplicEmbed(Sharpy, replic.id);

        const newMessage = await interactionChannel.send({
            content,
            embeds: [embed],
            components
        });

        await Db.UpdateReplicMessageId(Sharpy, {
            replicId: replic.id,
            newMessageId: newMessage.id
        });

        const messages = await interactionChannel.messages.fetch();
        const previousMessage = messages.find((msg) => msg.id === previousMessageId);

        if (previousMessage) await previousMessage.delete().catch(() => {});

        await interaction.followUp({
            content: `${Emojis.Util.Yes} | El mensaje de la réplica ha sido reenviado y actualizado.`
        });
    } catch (error) {
        console.error(error);
        await interaction.followUp({
            content: `${Emojis.Util.No} | Ocurrió un error al intentar mostrar la réplica.`
        });
    }
};
