import { ChannelType, PermissionsBitField } from "discord.js";
import { Config } from "../../Data/Config";
import { ModalsId, ResponseEmbed, TicketsCreatedEmbed } from "../../Helpers";
import { ModalEvent } from "../../Interfaces";
import { Emojis } from "../../Data/Emojis";
import { Db } from "../../Helpers/Db/Tickets";

export const modalEvent: ModalEvent = {
    id: ModalsId.CreateTicket,
    run: async (Sharpy, interaction) => {
        await interaction.deferUpdate();
        const EOT = Config.DiscordBot.EchoesOfTalent;
        const parentId = EOT.categories.tickets;
        const inputField = interaction.fields.fields.get(ModalsId.CreateTicketInput);
        const reason = inputField ? inputField.value : "No se proporcionó un motivo.";

        const rolesThatCanModerateTickets = [
            EOT.roles.PoderesMisticos,
            EOT.roles.Founder,
            EOT.roles.Director,
            EOT.roles.Supervisor,
            EOT.roles.Moderator,
            EOT.roles.Programador,
            EOT.roles.Staff
        ];

        const channelsInCategory = interaction.guild!.channels.cache.filter(
            (channel) => channel.parentId === parentId
        );

        if (channelsInCategory.size >= 50)
            return await interaction.followUp({
                embeds: [
                    ResponseEmbed({
                        type: "error",
                        message: "No se pueden crear más tickets en este momento.",
                        emoji: Emojis.Util.No
                    })
                ],
                ephemeral: true
            });

        if (
            channelsInCategory.some(
                (channel) =>
                    channel.name === `${EOT.prefixes.tickets}${interaction.user.id}`
            )
        ) {
            const channel = channelsInCategory.find(
                (channel) =>
                    channel.name === `${EOT.prefixes.tickets}${interaction.user.id}`
            );

            if (!channel)
                return await interaction.followUp({
                    embeds: [
                        ResponseEmbed({
                            type: "error",
                            message: "Ya tienes un ticket abierto.",
                            emoji: Emojis.Util.No
                        })
                    ],
                    ephemeral: true
                });

            return await interaction.followUp({
                embeds: [
                    ResponseEmbed({
                        type: "error",
                        message: `Ya tienes un ticket abierto.\n> Puedes verlo en <#${channel.id}>.`,
                        emoji: Emojis.Util.No,
                        size: "l"
                    })
                ],
                ephemeral: true
            });
        }

        const ticket = await Db.GetTicketByAuthorId(Sharpy, interaction.user.id);

        const isChannelInCategory = channelsInCategory.some(
            (channel) => channel.name === `${EOT.prefixes.tickets}${interaction.user.id}`
        );

        if (ticket && !isChannelInCategory) {
            return await interaction.followUp({
                embeds: [
                    ResponseEmbed({
                        type: "error",
                        message:
                            "Ya tienes un ticket registrado a tu usuario, contacta al Staff.",
                        emoji: Emojis.Util.No,
                        size: "l"
                    })
                ],
                ephemeral: true
            });
        }

        try {
            const channel = await interaction.guild!.channels.create({
                name: `${EOT.prefixes.tickets}${interaction.user.id}`,
                type: ChannelType.GuildText,
                parent: parentId,
                topic: `Ticket creado por ${interaction.user.tag}`,
                permissionOverwrites: [
                    {
                        id: interaction.guild!.id,
                        deny: [PermissionsBitField.Flags.ViewChannel]
                    },
                    {
                        id: interaction.user.id,
                        allow: [
                            PermissionsBitField.Flags.ViewChannel,
                            PermissionsBitField.Flags.ReadMessageHistory,
                            PermissionsBitField.Flags.SendMessages
                        ]
                    },
                    ...rolesThatCanModerateTickets.map((roleId) => ({
                        id: roleId,
                        allow: [
                            PermissionsBitField.Flags.ViewChannel,
                            PermissionsBitField.Flags.SendMessages,
                            PermissionsBitField.Flags.ReadMessageHistory,
                            PermissionsBitField.Flags.ManageMessages
                        ]
                    }))
                ]
            });

            if (!channel)
                return await interaction.followUp({
                    embeds: [
                        ResponseEmbed({
                            type: "error",
                            message: "No se pudo crear el ticket.",
                            emoji: Emojis.Util.No
                        })
                    ],
                    ephemeral: true
                });

            const ticket = await Db.CreateNewTicket(Sharpy, {
                authorId: interaction.user.id,
                messageId: "0",
                channelId: channel.id,
                affaire: reason
            });

            const { content, embed, components } = await TicketsCreatedEmbed(
                Sharpy,
                ticket.id
            );

            const message = await channel.send({
                content,
                embeds: [embed],
                components,
                allowedMentions: { parse: ["roles", "users"] }
            });

            await Db.UpdateTicketMessageId(Sharpy, {
                ticketId: ticket.id,
                newMessageId: message.id
            });

            await interaction.followUp({
                embeds: [
                    ResponseEmbed({
                        type: "success",
                        message: `Tu ticket ha sido creado.\n- Motivo: \`${ticket.affaire}\`\n> Puedes verlo en <#${ticket.channelId}>.`,
                        emoji: "🎫",
                        size: "l"
                    })
                ],
                ephemeral: true
            });
        } catch (error) {
            console.error(error);
            await interaction.followUp({
                embeds: [
                    ResponseEmbed({
                        type: "error",
                        message: "No se pudo crear el ticket.",
                        emoji: Emojis.Util.No
                    })
                ],
                ephemeral: true
            });
        }
    }
};
