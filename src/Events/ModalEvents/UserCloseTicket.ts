import { Message, PermissionsBitField } from "discord.js";
import { Emojis } from "../../Data/Emojis";
import { ModalsId, sleep } from "../../Helpers";
import { Db } from "../../Helpers/Db/Tickets";
import { ModalEvent } from "../../Interfaces";
import { Config } from "../../Data/Config";

export const modalEvent: ModalEvent = {
    id: ModalsId.UserCloseTicket,
    run: async (Sharpy, interaction) => {
        await interaction.deferUpdate();
        const inputField = interaction.fields.fields.get(ModalsId.UserCloseTicketInput);
        const reason = inputField?.value || "No se proporcionó un motivo.";
        const interactionChannel = interaction.channel!;
        const ticket = await Db.GetTicketByChannelId(Sharpy, interactionChannel.id);

        if (!ticket) {
            return interaction
                .followUp({
                    content: `${Emojis.Util.No} | No se encontró el ticket asociado a este canal.`
                })
                .then((msg: Message) =>
                    setTimeout(() => msg.delete().catch(() => {}), 5000)
                );
        }

        const guild = Sharpy.guilds.resolve(Config.DiscordBot.EchoesOfTalent.id)!;
        const channel = guild.channels.resolve(interactionChannel.id);

        if (!channel) {
            return interaction
                .followUp({
                    content: `${Emojis.Util.No} | No se encontró el canal asociado a este ticket.`
                })
                .then((msg: Message) =>
                    setTimeout(() => msg.delete().catch(() => {}), 5000)
                );
        }

        await channel
            .edit({
                permissionOverwrites: [
                    {
                        id: ticket.authorId,
                        deny: [PermissionsBitField.Flags.SendMessages]
                    }
                ]
            })
            .catch(() => {
                console.error("No se pudieron editar los permisos del canal.");
            });

        try {
            const resolution = await Db.CreateTicketResolution(Sharpy, {
                reason,
                ticketId: ticket.id,
                staffId: interaction.user.id
            });

            if (!resolution) {
                return interaction
                    .followUp({
                        content: `${Emojis.Util.No} | Ocurrió un error al cerrar el ticket. Por favor, inténtalo de nuevo más tarde.`
                    })
                    .then((msg: Message) =>
                        setTimeout(() => msg.delete().catch(() => {}), 5000)
                    );
            }

            const ticketResolved = await Db.CloseTicket(Sharpy, ticket.id, resolution.id);

            if (!ticketResolved) {
                return interaction
                    .followUp({
                        content: `${Emojis.Util.No} | Ocurrió un error al cerrar el ticket. Por favor, inténtalo de nuevo más tarde.`
                    })
                    .then((msg: Message) =>
                        setTimeout(() => msg.delete().catch(() => {}), 5000)
                    );
            }

            await Sharpy.UpdateTicketInCurrentChannel(interactionChannel.id);

            await interaction.followUp({
                content: `${Emojis.Util.Yes} | El ticket fue cerrado exitosamente por <@${interaction.user.id}> con la razón:\n> \`${reason}\`.`,
                ephemeral: false
            });

            sleep(30000).then(() => Sharpy.emit("closeTicket", channel));
        } catch (error) {
            console.error("Error al crear la resolución del ticket:", error);
            await interaction
                .followUp({
                    content: `${Emojis.Util.No} | Ocurrió un error al cerrar el ticket. Por favor, inténtalo de nuevo más tarde.`
                })
                .then((msg: Message) =>
                    setTimeout(() => msg.delete().catch(() => {}), 5000)
                );
        }
    }
};
