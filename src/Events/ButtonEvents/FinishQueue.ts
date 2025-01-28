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
            return await interaction
                .followUp({
                    content: `${Emojis.Util.No} | No hay ninguna cola en este canal.`
                })
                .then(async (int) => {
                    setTimeout(async () => {
                        await int.delete().catch(() => {});
                    }, 5000);
                });
        }

        if (currentQueue.list[0].id !== interactionUser.id) {
            return await interaction
                .followUp({
                    content: `${Emojis.Util.No} | No puedes pasar turno si no estás en el turno actual.`
                })
                .then(async (int) => {
                    setTimeout(async () => {
                        await int.delete().catch(() => {});
                    }, 5000);
                });
        }

        const modifyQueue = {
            ...currentQueue,
            list: currentQueue.list.slice(1)
        };

        Sharpy.ModifyQueue(interactionChannel.id, modifyQueue.list);

        Sharpy.UpdateQueueInCurrentChannel(interactionChannel.id);

        await interaction
            .followUp({
                content: `${Emojis.Util.Yes} | Pasando turno al siguiente.`
            })
            .then(async (int) => {
                setTimeout(async () => {
                    await int.delete().catch(() => {});
                }, 5000);
            });
    }
};
