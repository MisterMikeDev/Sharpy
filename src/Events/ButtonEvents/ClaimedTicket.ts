import { Emojis } from "../../Data/Emojis";
import { ButtonsId } from "../../Helpers";
import { ButtonEvent } from "../../Interfaces";

export const buttonEvent: ButtonEvent = {
    id: ButtonsId.ClaimedTicket,
    run: async (Sharpy, interaction) => {
        await interaction.deferUpdate();

        await interaction.followUp({
            content: `${Emojis.Util.No} | Este ticket ya ha sido reclamado.`
        });
    }
};
