import { PermissionsBitField, GuildMemberRoleManager } from "discord.js";
import { Config } from "../../Data/Config";
import { Emojis } from "../../Data/Emojis";
import { ModalsId, sleep } from "../../Helpers";
import { Db } from "../../Helpers/Db/Apeals";
import { ModalEvent } from "../../Interfaces";

export const modalEvent: ModalEvent = {
    id: ModalsId.ApealCreatePardon,
    run: async (Sharpy, interaction) => {
        await interaction.deferUpdate();

        const idField = interaction.fields.fields.get(ModalsId.ApealVerify);
        const reasonField = interaction.fields.fields.get(
            ModalsId.ApealCreatePardonReason
        );
        const userIdField = interaction.fields.fields.get(
            ModalsId.ApealCreatePardonUserId
        );

        const id = idField?.value as string;
        const reason = reasonField?.value ?? "No se especificó una razón.";
        const userId = userIdField?.value as string;

        const user = await Sharpy.users.fetch(userId);

        const apeal = await Db.GetApealByUserId(Sharpy, user.id);

        if (!apeal)
            return await interaction.followUp({
                content: `${Emojis.Util.No} | No hay ninguna apelación pendiente.`,
                ephemeral: true
            });

        if (apeal.id !== id)
            return await interaction.followUp({
                content: `${Emojis.Util.No} | No cumpliste la verificación.`,
                ephemeral: true
            });

        const memberPermissions = interaction.member!.permissions;

        const rolesThatCanResolveApeals = [
            Config.DiscordBot.EchoesOfTalent.roles.Founder,
            Config.DiscordBot.EchoesOfTalent.roles.FounderApeal,
            Config.DiscordBot.EchoesOfTalent.roles.Director,
            Config.DiscordBot.EchoesOfTalent.roles.DirectorApeal,
            Config.DiscordBot.EchoesOfTalent.roles.Staff,
            Config.DiscordBot.EchoesOfTalent.roles.StaffApeal
        ];

        const permissions =
            memberPermissions instanceof PermissionsBitField
                ? memberPermissions
                : new PermissionsBitField(BigInt(memberPermissions as string));
        const hasRequiredPermissions = permissions.has(
            PermissionsBitField.Flags.Administrator
        );

        let hasRequiredRoles = false;
        if (interaction.member?.roles instanceof GuildMemberRoleManager) {
            hasRequiredRoles = interaction.member.roles.cache.some((role) =>
                rolesThatCanResolveApeals.includes(role.id)
            );
        } else if (Array.isArray(interaction.member?.roles)) {
            hasRequiredRoles = interaction.member.roles.some((roleId) =>
                rolesThatCanResolveApeals.includes(roleId)
            );
        }

        if (!(hasRequiredRoles || hasRequiredPermissions)) {
            return await interaction.followUp({
                content: `${Emojis.Util.No} | No tienes permisos para usar este botón.`,
                ephemeral: true
            });
        }

        await Db.CreatePardon(Sharpy, {
            userId: user.id,
            staffId: interaction.user.id,
            reason
        });

        await interaction.followUp({
            content: `${Emojis.Util.Yes} | Se ha perdonado la apelación de ${user.username}.`
        });

        sleep(120000).then(() => Sharpy.emit("userPardon", user, reason, apeal));
    }
};
