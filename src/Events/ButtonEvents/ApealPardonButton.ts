import {
    PermissionFlagsBits,
    PermissionsBitField,
    GuildMemberRoleManager
} from "discord.js";
import { Config } from "../../Data/Config";
import { Emojis } from "../../Data/Emojis";
import { ButtonsId, PardonModal } from "../../Helpers";
import { ButtonEvent } from "../../Interfaces";
import { Db } from "../../Helpers/Db/Apeals";

export const buttonEvent: ButtonEvent = {
    id: ButtonsId.PardonApeal,
    run: async (Sharpy, interaction) => {
        const memberPermissions = interaction.member?.permissions;
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
                content: `${Emojis.Util.No} | No puedes usar este botón.`,
                ephemeral: true
            });
        }

        const currentApeal = await Db.GetApealByUserId(Sharpy, interaction.user.id);

        if (!currentApeal) {
            return await interaction.followUp({
                content: `${Emojis.Util.No} | No hay ninguna apelación pendiente.`,
                ephemeral: true
            });
        }

        await interaction.showModal(PardonModal);
    }
};
