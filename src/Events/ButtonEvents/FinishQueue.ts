import { Emojis } from "../../Data/Emojis";
import { ButtonsId } from "../../Helpers";
import { ButtonEvent } from "../../Interfaces";

export const buttonEvent: ButtonEvent = {
    id: ButtonsId.FinishQueue,
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

        if (currentQueue.list[0].id !== interactionUser.id) {
            return await interaction.followUp({
                content: `${Emojis.Util.No} | No puedes pasar turno si no estás en el turno actual.`,
                ephemeral: true
            });
        }

        const modifyQueue = {
            ...currentQueue,
            list: currentQueue.list.slice(1)
        };

        Sharpy.ModifyQueue(interactionChannel.id, modifyQueue.list);

        Sharpy.UpdateQueueInCurrentChannel(interactionChannel.id);
    }
};
