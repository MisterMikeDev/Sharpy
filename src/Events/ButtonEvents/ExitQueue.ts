import { Emojis } from "../../Data/Emojis";
import { ButtonsId } from "../../Helpers";
import { ButtonEvent } from "../../Interfaces";

export const buttonEvent: ButtonEvent = {
    id: ButtonsId.ExitQueue,
    run: async (Sharpy, interaction) => {
        await interaction.deferUpdate();

        const interactionChannel = interaction.channel!;
        const interactionUser = interaction.user;
        const currentQueue = Sharpy.queue.get(interactionChannel.id);

        if (!currentQueue) {
            return await interaction.followUp({
                content: `${Emojis.Util.No} | No hay ninguna lista en este canal.`,
                ephemeral: true
            });
        }

        if (!currentQueue.list.some((user) => user.id === interactionUser.id)) {
            return await interaction.followUp({
                content: `${Emojis.Util.No} | No estás en la lista.`,
                ephemeral: true
            });
        }

        const modifyQueue = {
            ...currentQueue,
            list: currentQueue.list.filter((user) => user.id !== interactionUser.id)
        };

        Sharpy.ModifyQueue(interactionChannel.id, modifyQueue.list);

        Sharpy.UpdateQueueInCurrentChannel(interactionChannel.id);
    }
};
