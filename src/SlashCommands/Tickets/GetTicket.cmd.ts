import { CommandInteraction, CacheType, User } from "discord.js";
import { Sharpy } from "../../Client";
import { CreateTicketListEmbed } from "../../Helpers/";
import { Db } from "../../Helpers/Db/Tickets";
import { Emojis } from "../../Data/Emojis";

export const GetTicketCommand = async ({
    Sharpy,
    interaction,
    options
}: {
    Sharpy: Sharpy;
    interaction: CommandInteraction<CacheType>;
    options: {
        all: boolean | null;
        unresolved: boolean | null;
        claimed: boolean | null;
        byAuthor: User | null;
        byId: string | null;
    };
}) => {
    const { all, byAuthor, byId, claimed, unresolved } = options;

    if (!all && !byAuthor && !byId && !claimed && !unresolved) {
        return await interaction.followUp({
            content: `${Emojis.Util.No} | Debes poner argumentos para obtener un ticket.`,
            ephemeral: true
        });
    }

    if (all) {
        const tickets = await Db.GetAllTickets(Sharpy);

        if (!tickets.length) {
            return await interaction.followUp({
                content: `${Emojis.Util.No} | No se han encontrado tickets.`,
                ephemeral: true
            });
        }

        const { embed, components } = CreateTicketListEmbed(Sharpy, tickets);

        return await interaction.followUp({
            embeds: [embed],
            components
        });
    }

    if (byAuthor) {
        const ticket = await Db.GetTicketByAuthorId(Sharpy, byAuthor.id);

        if (!ticket) {
            return await interaction.followUp({
                content: `${Emojis.Util.No} | No se ha encontrado el ticket.`,
                ephemeral: true
            });
        }

        const { embed, components } = CreateTicketListEmbed(Sharpy, [ticket]);

        return await interaction.followUp({
            embeds: [embed],
            components
        });
    }

    if (byId) {
        const ticket = await Db.GetTicketById(Sharpy, byId);

        if (!ticket) {
            return await interaction.followUp({
                content: `${Emojis.Util.No} | No se ha encontrado el ticket.`,
                ephemeral: true
            });
        }

        const { embed, components } = CreateTicketListEmbed(Sharpy, [ticket]);

        return await interaction.followUp({
            embeds: [embed],
            components
        });
    }

    if (claimed) {
        const tickets = await Db.GetResolvedTickets(Sharpy);

        if (!tickets.length) {
            return await interaction.followUp({
                content: `${Emojis.Util.No} | No se han encontrado tickets.`,
                ephemeral: true
            });
        }

        const { embed, components } = CreateTicketListEmbed(Sharpy, tickets);

        return await interaction.followUp({
            embeds: [embed],
            components
        });
    }

    if (unresolved) {
        const tickets = await Db.GetUnresolvedTickets(Sharpy);

        if (!tickets.length) {
            return await interaction.followUp({
                content: `${Emojis.Util.No} | No se han encontrado tickets.`,
                ephemeral: true
            });
        }

        const { embed, components } = CreateTicketListEmbed(Sharpy, tickets);

        return await interaction.followUp({
            embeds: [embed],
            components
        });
    }

    return await interaction.followUp({
        content: `${Emojis.Util.No} | No se ha encontrado el ticket.`,
        ephemeral: true
    });
};
