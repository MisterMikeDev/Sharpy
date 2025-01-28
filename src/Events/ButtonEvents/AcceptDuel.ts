import { Emojis } from "../../Data/Emojis";
import { ButtonsId } from "../../Helpers";
import { ButtonEvent } from "../../Interfaces";
import { TurnType } from "../../Interfaces/Other/Duel";

export const buttonEvent: ButtonEvent = {
    id: ButtonsId.AcceptDuel,
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
                content: `${Emojis.Util.No} | Solo el usuario retado puede aceptar el duelo.`,
                ephemeral: true
            });
        }

        await Sharpy.ModifyDuel(interactionChannel.id, {
            ...currentDuel,
            currentTurn: 1 as TurnType
        });

        await Sharpy.UpdateDuelInCurrentChannel(interactionChannel.id);

        await interaction.followUp({
            content: `${Emojis.Util.Yes} | Aceptando el duelo...`,
            ephemeral: true
        });
    }
};
