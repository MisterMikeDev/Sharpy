import { PermissionsBitField } from "discord.js";
import { Config } from "../../Data/Config";
import { ModalsId } from "../../Helpers";
import { Db } from "../../Helpers/Db/Tickets";
import { ModalEvent } from "../../Interfaces";
import { Emojis } from "../../Data/Emojis";

export const modalEvent: ModalEvent = {
    id: ModalsId.StaffCloseTicket,
    run: async (Sharpy, interaction) => {
        await interaction.deferUpdate();
        const inputField = interaction.fields.fields.get(ModalsId.StaffCloseTicketInput);
        const reason = inputField?.value || "No se proporcionó un motivo.";
        const interactionChannel = interaction.channel!;
        const ticket = await Db.GetTicketByChannelId(Sharpy, interactionChannel.id);

        if (!ticket) {
            return interaction.followUp({
                content: `${Emojis.Util.No} | No se encontró el ticket asociado a este canal.`,
                ephemeral: true
            });
        }

        const guild = Sharpy.guilds.resolve(Config.DiscordBot.EchosOfTalent.id)!;
        const channel = guild.channels.resolve(interactionChannel.id);

        if (!channel) {
            return interaction.followUp({
                content: `${Emojis.Util.No} | No se encontró el canal asociado a este ticket.`,
                ephemeral: true
            });
        }

        const EOT = Config.DiscordBot.EchosOfTalent;
        const rolesThatCanModerateTickets = [
            EOT.roles.PoderesMisticos,
            EOT.roles.Founder,
            EOT.roles.Director,
            EOT.roles.Supervisor,
            EOT.roles.Moderator,
            EOT.roles.Programador,
            EOT.roles.Staff
        ];

        await channel
            .edit({
                permissionOverwrites: [
                    {
                        id: interaction.guild!.id,
                        deny: [PermissionsBitField.Flags.ViewChannel]
                    },
                    {
                        id: interaction.user.id,
                        allow: [
                            PermissionsBitField.Flags.ViewChannel,
                            PermissionsBitField.Flags.ReadMessageHistory
                        ],
                        deny: [PermissionsBitField.Flags.SendMessages]
                    },
                    ...rolesThatCanModerateTickets.map((roleId) => ({
                        id: roleId,
                        allow: [
                            PermissionsBitField.Flags.ViewChannel,
                            PermissionsBitField.Flags.ManageMessages
                        ]
                    }))
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
                return interaction.followUp({
                    content: `${Emojis.Util.No} | Ocurrió un error al cerrar el ticket. Por favor, inténtalo de nuevo más tarde.`,
                    ephemeral: true
                });
            }

            const ticketResolved = await Db.CloseTicket(Sharpy, ticket.id, resolution.id);

            if (!ticketResolved) {
                return interaction.followUp({
                    content: `${Emojis.Util.No} | Ocurrió un error al cerrar el ticket. Por favor, inténtalo de nuevo más tarde.`,
                    ephemeral: true
                });
            }

            await Sharpy.UpdateTicketInCurrentChannel(interactionChannel.id);

            await interaction.followUp({
                content: `${Emojis.Util.Yes} | El ticket fue cerrado exitosamente por <@${interaction.user.id}> con la razón:\n> \`${reason}\`.`,
                ephemeral: false
            });

            setTimeout(() => {
                Sharpy.emit("closeTicket", channel);
            }, 30000);
        } catch (error) {
            console.error("Error al crear la resolución del ticket:", error);
            await interaction.followUp({
                content: `${Emojis.Util.No} | Ocurrió un error al cerrar el ticket. Por favor, inténtalo de nuevo más tarde.`,
                ephemeral: true
            });
        }
    }
};
