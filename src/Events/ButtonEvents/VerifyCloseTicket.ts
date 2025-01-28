import { ButtonsId, UserCloseTicketModal } from "../../Helpers";
import { Db } from "../../Helpers/Db/Tickets";
import { ButtonEvent } from "../../Interfaces";

export const buttonEvent: ButtonEvent = {
    id: ButtonsId.VerifyCloseTicket,
    run: async (Sharpy, interaction) => {
        const channel = interaction.channel!;
        const user = interaction.user;
        const ticket = await Db.GetTicketByChannelId(Sharpy, channel.id);

        if (!ticket) {
            return await interaction.reply({
                content: "Este canal no está asociado a un ticket.",
                ephemeral: true
            });
        }

        if (!ticket.staffIdClaimed) {
            return await interaction.reply({
                content: "No puedes cerrar un ticket que no ha sido claimeado.",
                ephemeral: true
            });
        }

        if (user.id !== ticket.staffIdClaimed) {
            return await interaction.reply({
                content:
                    "Solo el staff encargado del ticket puede verificar el cierre del mismo.",
                ephemeral: true
            });
        }

        await interaction.showModal(UserCloseTicketModal);
    }
};
