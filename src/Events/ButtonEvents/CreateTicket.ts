import { ButtonsId, CreateTicketModal } from "../../Helpers";
import { ButtonEvent } from "../../Interfaces";

export const buttonEvent: ButtonEvent = {
    id: ButtonsId.CreateTicket,
    run: async (Sharpy, interaction) => {
        await interaction.showModal(CreateTicketModal);
    }
};
