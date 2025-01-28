import {
    PermissionFlagsBits,
    PermissionsBitField,
    GuildMemberRoleManager
} from "discord.js";
import { Config } from "../../Data/Config";
import { Emojis } from "../../Data/Emojis";
import { ButtonsId, StaffCloseTicketModal } from "../../Helpers";
import { ButtonEvent } from "../../Interfaces";
import { Db } from "../../Helpers/Db/Tickets";

export const buttonEvent: ButtonEvent = {
    id: ButtonsId.StaffCloseTicket,
    run: async (Sharpy, interaction) => {
        const interactionChannel = interaction.channel!;
        const interactionMember = interaction.member!;

        const memberPermissions = interactionMember.permissions;
        const requiredPermissions = [PermissionFlagsBits.Administrator];
        const requiredRoles = [
            Config.DiscordBot.EchosOfTalent.roles.PoderesMisticos,
            Config.DiscordBot.EchosOfTalent.roles.Founder,
            Config.DiscordBot.EchosOfTalent.roles.Director,
            Config.DiscordBot.EchosOfTalent.roles.Programador,
            Config.DiscordBot.EchosOfTalent.roles.Admin,
            Config.DiscordBot.EchosOfTalent.roles.Supervisor,
            Config.DiscordBot.EchosOfTalent.roles.Moderator
        ];

        const permissions =
            memberPermissions instanceof PermissionsBitField
                ? memberPermissions
                : new PermissionsBitField(BigInt(memberPermissions as string));
        const hasRequiredPermissions = requiredPermissions.some((permission) =>
            permissions?.has(permission)
        );

        let hasRequiredRoles = false;
        if (interaction.member?.roles instanceof GuildMemberRoleManager) {
            hasRequiredRoles = interaction.member.roles.cache.some((role) =>
                requiredRoles.includes(role.id)
            );
        } else if (Array.isArray(interaction.member?.roles)) {
            hasRequiredRoles = interaction.member.roles.some((roleId) =>
                requiredRoles.includes(roleId)
            );
        }

        if (!hasRequiredPermissions && !hasRequiredRoles) {
            return await interaction.reply({
                content: `${Emojis.Util.No} | No tienes permisos usar este botón.`,
                ephemeral: true
            });
        }

        const ticket = await Db.GetTicketByChannelId(Sharpy, interactionChannel.id);

        if (!ticket) {
            return await interaction.reply({
                content: `${Emojis.Util.No} | No se encontró el ticket asociado a este canal.`,
                ephemeral: true
            });
        }

        if (!ticket.staffIdClaimed) {
            return await interaction.reply({
                content: `${Emojis.Util.No} | Este ticket no ha sido reclamado por ningún miembro del staff.`,
                ephemeral: true
            });
        }

        if (ticket.resolution) {
            return await interaction.reply({
                content: `${Emojis.Util.No} | Este ticket ya ha sido cerrado.`,
                ephemeral: true
            });
        }

        await interaction.showModal(StaffCloseTicketModal);
    }
};
