import { EmbedBuilder } from "discord.js";
import { Ticket } from "../../../Interfaces";
import { Sharpy } from "../../../Client";
import { RoundedTimeStamp } from "../../Functions";

export const CreateTicketListEmbed = (Sharpy: Sharpy, tickets: Ticket[]) => {
    function TicketListToDescription(tickets: Ticket[]) {
        return tickets
            .map((ticket, i) => {
                const id = ticket.id;
                const author = `<@${ticket.authorId}>`;
                const affaire = ticket.affaire;
                const createdAt = RoundedTimeStamp(ticket.createdAt.getTime(), {
                    itsForDiscord: true,
                    type: "longDateAndTime"
                });
                return `${i + 1}.- **ID**: \`${id}\`\n- **Autor**: ${author}\n- **Asunto**: ${affaire}\n- **Creado**: ${createdAt}`;
            })
            .join("\n");
    }

    const description =
        tickets.length > 0
            ? TicketListToDescription(tickets)
            : "No se han encontrado tickets.";

    const embed = new EmbedBuilder()
        .setTitle("Lista de tickets")
        .setDescription(description)
        .setColor("#5865f2")
        .setFooter({
            text: "Echoes of Talent",
            iconURL: Sharpy.user!.displayAvatarURL()
        })
        .setTimestamp();

    const components = [] as any[];
    return {
        embed,
        components
    };
};
