import { Emojis } from "../../Data/Emojis";
import { ButtonsId } from "../../Helpers";
import { ButtonEvent } from "../../Interfaces";

export const buttonEvent: ButtonEvent = {
    id: ButtonsId.DeclineDuel,
    run: async (Sharpy, interaction) => {
        await interaction.deferUpdate();

        const interactionChannel = interaction.channel!;
        const currentDuel = Sharpy.duel.get(interactionChannel.id);

        if (!currentDuel) {
            return await interaction.followUp({
                content: `${Emojis.Util.No} | No hay un duelo en curso en este canal.`,
                ephemeral: true
            });
        }
        const rivalUser = currentDuel.rival!;

        if (interaction.user.id !== rivalUser.id) {
            return await interaction.followUp({
                content: `${Emojis.Util.No} | Solo el usuario retado puede declinar el duelo.`,
                ephemeral: true
            });
        }

        await interaction.followUp({
            content: `${Emojis.Util.No} | Declinando el duelo...`,
            ephemeral: true
        });

        await Sharpy.DeclineDuel(currentDuel);
    }
};
