import {
    CacheType,
    CommandInteraction,
    CommandInteractionOptionResolver,
    EmbedBuilder,
    GuildMemberRoleManager,
    PermissionFlagsBits,
    PermissionsBitField
} from "discord.js";
import { Sharpy } from "../../Client";
import { Emojis } from "../../Data/Emojis";
import { Config } from "../../Data/Config";

export const UntimeoutCommand = async ({
    interaction,
    options
}: {
    Sharpy: Sharpy;
    interaction: CommandInteraction<CacheType>;
    options: CommandInteractionOptionResolver;
}) => {
    const user = options.getUser("user", true);
    const guild = interaction.guild!;
    const member = guild.members.cache.get(user.id);

    const memberPermissions = interaction.member?.permissions;
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
        return await interaction.followUp({
            content: `${Emojis.Util.No} | No tienes los permisos necesarios para ejecutar este comando.`
        });
    }

    if (!member)
        return await interaction.followUp({
            content: `${Emojis.Util.No} | No se ha encontrado al usuario.`,
            ephemeral: true
        });

    if (user.bot)
        return await interaction.followUp({
            content: `${Emojis.Util.No} | No puedes quitarle el timeout a un bot.`,
            ephemeral: true
        });

    if (
        !member.communicationDisabledUntil ||
        member.communicationDisabledUntil <= new Date()
    )
        return await interaction.followUp({
            content: `${Emojis.Util.No} | El usuario no tiene un timeout activo.`,
            ephemeral: true
        });

    if (
        member.roles.highest.position >= Number(interaction.guild?.roles.highest.position)
    )
        return await interaction.followUp({
            content: `${Emojis.Util.No} | No puedes quitarle el timeout a un usuario con un rol superior al tuyo.`,
            ephemeral: true
        });

    try {
        await member.timeout(null);

        const responseEmbed = new EmbedBuilder()
            .setColor("#550000")
            .setDescription(
                `${Emojis.Util.Yes} | A <@${member.id}> se le ha removido el timeout.`
            )
            .setFooter({
                text: `Timeout | ${member.user.globalName}`,
                iconURL: member.user.displayAvatarURL()
            })
            .setTimestamp();

        await interaction.followUp({ embeds: [responseEmbed] });
    } catch (e) {
        console.error(e);
        await interaction.followUp({
            content: `${Emojis.Util.No} | Ha ocurrido un error al intentar quitarle el timeout al usuario.`,
            ephemeral: true
        });
    }
};
