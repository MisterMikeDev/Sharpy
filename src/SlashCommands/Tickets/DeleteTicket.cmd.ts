import { CommandInteraction, CacheType, User } from "discord.js";
import { Sharpy } from "../../Client";
import { Db } from "../../Helpers/Db/Tickets";
import { Emojis } from "../../Data/Emojis";

export const DeleteTicketCommand = async ({
    Sharpy,
    interaction,
    options
}: {
    Sharpy: Sharpy;
    interaction: CommandInteraction<CacheType>;
    options: {
        byId: string | null;
        byAuthor: User | null;
        all: boolean | null;
    };
}) => {
    const { all, byAuthor, byId } = options;

    if (!byId && !byAuthor && !all) {
        return await interaction.followUp({
            content: `${Emojis.Util.No} | Debes poner argumentos para eliminar un ticket.`,
            ephemeral: true
        });
    }

    if (all) {
        await Db.DeleteAllTickets(Sharpy);

        return await interaction.followUp({
            content: `${Emojis.Util.Yes} | Tickets eliminados correctamente.`,
            ephemeral: true
        });
    }

    if (byId) {
        await Db.DeleteTicketByIdWithReference(Sharpy, byId);

        return await interaction.followUp({
            content: `${Emojis.Util.Yes} | Ticket eliminado correctamente.`,
            ephemeral: true
        });
    }

    if (byAuthor) {
        await Db.DeleteTicketByAuthorId(Sharpy, byAuthor.id);

        return await interaction.followUp({
            content: `${Emojis.Util.Yes} | Tickets eliminados correctamente.`,
            ephemeral: true
        });
    }

    return await interaction.followUp({
        content: `${Emojis.Util.No} | No se ha encontrado el ticket.`,
        ephemeral: true
    });
};
