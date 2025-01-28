import { Emojis } from "../../Data/Emojis";
import { ButtonsId, VerifyCloseTicketEmbed } from "../../Helpers";
import { Db } from "../../Helpers/Db/Tickets";
import { ButtonEvent } from "../../Interfaces";

export const buttonEvent: ButtonEvent = {
    id: ButtonsId.CloseTicket,
    run: async (Sharpy, interaction) => {
        await interaction.deferUpdate();
        const interactionChannel = interaction.channel!;
        const interactionUser = interaction.user!;
        const ticket = await Db.GetTicketByChannelId(Sharpy, interactionChannel.id);

        if (!ticket) {
            return await interaction.followUp({
                content: `${Emojis.Util.No} | No tienes permisos para ejecutar este comando.`
            });
        }

        if (ticket.authorId !== interactionUser.id) {
            return await interaction.followUp({
                content: `${Emojis.Util.No} | No tienes permisos para ejecutar este comando.`
            });
        }

        const { embed, components } = VerifyCloseTicketEmbed();

        await interaction.followUp({
            embeds: [embed],
            components
        });
    }
};
