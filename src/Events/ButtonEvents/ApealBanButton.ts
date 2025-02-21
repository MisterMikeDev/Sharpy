import {
    PermissionFlagsBits,
    PermissionsBitField,
    GuildMemberRoleManager
} from "discord.js";
import { Config } from "../../Data/Config";
import { Emojis } from "../../Data/Emojis";
import { BanModal, ButtonsId } from "../../Helpers";
import { Db } from "../../Helpers/Db/Apeals";
import { ButtonEvent } from "../../Interfaces";

export const buttonEvent: ButtonEvent = {
    id: ButtonsId.DefinitiveBan,
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
            Config.DiscordBot.EchoesOfTalent.roles.Moderator
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
            return await interaction.followUp({
                content: `${Emojis.Util.No} | No puedes usar este botón.`,
                ephemeral: true
            });
        }

        const currentBan = await Db.GetApealByUserId(Sharpy, interaction.user.id);

        if (!currentBan) {
            return await interaction.followUp({
                content: `${Emojis.Util.No} | No hay ninguna apelación pendiente.`,
                ephemeral: true
            });
        }

        await interaction.showModal(BanModal);
    }
};
