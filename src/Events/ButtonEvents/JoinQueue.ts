import { GuildMember } from "discord.js";
import { Emojis } from "../../Data/Emojis";
import { ButtonsId, CheckIfUserIsInKaraokeVoiceChat } from "../../Helpers";
import { QueueEmbed } from "../../Helpers/Components/Embeds/Queue";
import { ButtonEvent } from "../../Interfaces";

export const buttonEvent: ButtonEvent = {
    id: ButtonsId.JoinQueue,
    run: async (Sharpy, interaction) => {
        await interaction.deferUpdate();

        const interactionChannel = interaction.channel!;
        const interactionUser = interaction.user;
        const currentQueue = Sharpy.queue.get(interactionChannel.id);

        if (!CheckIfUserIsInKaraokeVoiceChat(interaction.member as GuildMember))
            return await interaction.followUp({
                content: `${Emojis.Util.No} | Debes estar en un canal de Karaoke para unirte a la lista.`,
                ephemeral: true
            });

        if (!currentQueue) {
            Sharpy.CreateQueue(interactionChannel.id, interaction.message.id, [
                interactionUser
            ]);

            const newQueue = Sharpy.queue.get(interactionChannel.id)!;

            const { content, embed, components } = QueueEmbed(Sharpy, newQueue);

            const intMsg = await interaction.channel!.send({
                content,
                embeds: [embed],
                components
            });

            Sharpy.ChangeMessageId(interactionChannel.id, intMsg.id);

            Sharpy.UpdateQueueInCurrentChannel(interactionChannel.id);

            return;
        }

        if (currentQueue.list.some((user) => user.id === interactionUser.id)) {
            return await interaction.followUp({
                content: `${Emojis.Util.No} | Ya estás en la lista, ${interactionUser.username}.`,
                ephemeral: true
            });
        }

        const modifyQueue = {
            ...currentQueue,
            list: [...currentQueue.list, interactionUser]
        };

        Sharpy.ModifyQueue(interactionChannel.id, modifyQueue.list);

        Sharpy.UpdateQueueInCurrentChannel(interactionChannel.id);
    }
};
