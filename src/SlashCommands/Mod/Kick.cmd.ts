import {
    CacheType,
    CommandInteraction,
    CommandInteractionOptionResolver,
    GuildMember,
    GuildMemberRoleManager,
    PermissionFlagsBits,
    PermissionsBitField
} from "discord.js";
import { Emojis } from "../../Data/Emojis";
import { Config } from "../../Data/Config";
import { Sharpy } from "../../Client";

export const KickCommand = async ({
    interaction,
    options
}: {
    Sharpy: Sharpy;
    interaction: CommandInteraction<CacheType>;
    options: CommandInteractionOptionResolver;
}) => {
    await interaction.deferReply();

    const user = options.getUser("user");
    const reason = options.getString("reason") || "No se proporcionó una razón.";
    const guild = interaction.guild!;

    if (!user) {
        return await interaction.followUp({
            content: `${Emojis.Util.No} | Debes mencionar a un usuario o proporcionar su ID.`,
            ephemeral: true
        });
    }

    const targetMember = await guild.members.fetch(user.id).catch(() => null);
    if (!targetMember) {
        return await interaction.followUp({
            content: `${Emojis.Util.No} | No se pudo encontrar al usuario en este servidor.`,
            ephemeral: true
        });
    }

    const memberPermissions = interaction.member?.permissions;
    const requiredPermissions = [PermissionFlagsBits.Administrator];
    const requiredRoles = [
        Config.DiscordBot.EchoesOfTalent.roles.PoderesMisticos,
        Config.DiscordBot.EchoesOfTalent.roles.Founder,
        Config.DiscordBot.EchoesOfTalent.roles.Director,
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

    if (!(hasRequiredRoles || hasRequiredPermissions)) {
        return await interaction.followUp({
            content: `${Emojis.Util.No} | No tienes los permisos necesarios para ejecutar este comando.`,
            ephemeral: true
        });
    }

    const executor = interaction.member as GuildMember;
    if (executor.roles.highest.position <= targetMember.roles.highest.position) {
        return await interaction.followUp({
            content: `${Emojis.Util.No} | No puedes expulsar a alguien con un rol igual o superior al tuyo.`,
            ephemeral: true
        });
    }

    if (!targetMember.kickable) {
        return await interaction.followUp({
            content: `${Emojis.Util.No} | No puedo expulsar a este usuario. Verifica que mi rol tenga los permisos adecuados.`,
            ephemeral: true
        });
    }

    try {
        await targetMember.kick(reason);
        await interaction.followUp({
            content: `${Emojis.Util.Yes} | ${user.tag} ha sido expulsado. Razón: ${reason}`
        });
    } catch (error) {
        console.error(error);
        await interaction.followUp({
            content: `${Emojis.Util.No} | Ocurrió un error al intentar expulsar a ${user.tag}.`,
            ephemeral: true
        });
    }
};
