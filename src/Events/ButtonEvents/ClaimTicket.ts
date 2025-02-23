import {
    GuildMemberRoleManager,
    PermissionFlagsBits,
    PermissionsBitField
} from "discord.js";
import { Emojis } from "../../Data/Emojis";
import { ButtonsId } from "../../Helpers";
import { Db } from "../../Helpers/Db/Tickets";
import { ButtonEvent } from "../../Interfaces";
import { Config } from "../../Data/Config";

export const buttonEvent: ButtonEvent = {
    id: ButtonsId.ClaimTicket,
    run: async (Sharpy, interaction) => {
        await interaction.deferUpdate();

        const interactionChannel = interaction.channel!;
        const interactionMember = interaction.member!;

        const memberPermissions = interactionMember.permissions;
        const requiredPermissions = [PermissionFlagsBits.Administrator];
        const requiredRoles = [
            Config.DiscordBot.EchoesOfTalent.roles.PoderesMisticos,
            Config.DiscordBot.EchoesOfTalent.roles.Founder,
            Config.DiscordBot.EchoesOfTalent.roles.Director,
            Config.DiscordBot.EchoesOfTalent.roles.Programador,
            Config.DiscordBot.EchoesOfTalent.roles.Admin,
            Config.DiscordBot.EchoesOfTalent.roles.Supervisor,
            Config.DiscordBot.EchoesOfTalent.roles.Moderator,
            Config.DiscordBot.EchoesOfTalent.roles.Ayudante,
            Config.DiscordBot.EchoesOfTalent.roles.Staff
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

        if (!(hasRequiredRoles || hasRequiredPermissions)) {
            return await interaction.followUp({
                content: `${Emojis.Util.No} | No tienes permisos para ejecutar este comando.`,
                ephemeral: true
            });
        }

        const ticket = await Db.GetTicketByChannelId(Sharpy, interactionChannel.id);

        if (!ticket) {
            return await interaction.followUp({
                content: `${Emojis.Util.No} | No se ha encontrado el ticket.`,
                ephemeral: true
            });
        }

        await Db.ClaimTicket(Sharpy, {
            staffId: interaction.user.id,
            ticketId: ticket.id
        });

        await interaction.followUp({
            content: `${Emojis.Util.Yes} | Has reclamado el ticket.`,
            ephemeral: true
        });

        await Sharpy.UpdateTicketInCurrentChannel(interactionChannel.id);
    }
};
