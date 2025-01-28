import { CommandInteraction, CacheType } from "discord.js";
import { Sharpy } from "../../Client";
import { Db } from "../../Helpers/Db/Tickets";
import { Emojis } from "../../Data/Emojis";

export const UnclaimCommand = async ({
    Sharpy,
    interaction
}: {
    Sharpy: Sharpy;
    interaction: CommandInteraction<CacheType>;
}) => {
    const interactionChannel = interaction.channel!;

    const ticket = await Db.GetTicketByChannelId(Sharpy, interactionChannel.id);

    if (!ticket) {
        return await interaction.followUp({
            content: `${Emojis.Util.No} | No se ha encontrado el ticket.`,
            ephemeral: true
        });
    }

    if (ticket.staffIdClaimed !== interaction.user.id) {
        return await interaction.followUp({
            content: `${Emojis.Util.No} | No puedes desasignar un ticket que no has asignado.`,
            ephemeral: true
        });
    }

    await Db.UnclaimTicket(Sharpy, ticket.id);

    await Sharpy.UpdateTicketInCurrentChannel(interactionChannel.id);

    await interaction.followUp({
        content: `${Emojis.Util.Yes} | Ticket desasignado correctamente.`,
        ephemeral: true
    });
};
