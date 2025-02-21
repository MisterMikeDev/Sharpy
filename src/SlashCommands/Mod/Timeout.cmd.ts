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

export const TimeoutCommand = async ({
    interaction,
    options
}: {
    Sharpy: Sharpy;
    interaction: CommandInteraction<CacheType>;
    options: CommandInteractionOptionResolver;
}) => {
    await interaction.deferReply();
    const user = options.getUser("user", true);
    const time = options.getString("time") ?? "10m";
    const reason = options.getString("reason") ?? "No especificado.";
    const guild = interaction.guild!;
    const member = guild.members.cache.get(user.id);

    const formattedTime = FormatTime(time);
    const textTime = FormatTimeToText(formattedTime);

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
            content: `${Emojis.Util.No} | No puedes darle timeout a un bot.`,
            ephemeral: true
        });

    if (member.communicationDisabledUntil) {
        const timeoutEnd = member.communicationDisabledUntil;
        const currentTime = new Date();

        if (timeoutEnd > currentTime) {
            return await interaction.followUp({
                content: `${Emojis.Util.No} | El usuario ya tiene un timeout activo.`,
                ephemeral: true
            });
        }
    }

    if (
        member.roles.highest.position >= Number(interaction.guild?.roles.highest.position)
    )
        return await interaction.followUp({
            content: `${Emojis.Util.No} | No puedes darle timeout a un usuario con un rol superior al tuyo.`,
            ephemeral: true
        });

    try {
        await member.timeout(formattedTime, reason);

        const responseEmbed = new EmbedBuilder()
            .setColor("#550000")
            .setDescription(
                `${Emojis.Util.Yes} | <@${member.id}> ha sido silenciado por **${textTime}** por la razón: \`${reason}\``
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
            content: `${Emojis.Util.No} | Ha ocurrido un error al intentar darle timeout al usuario.`,
            ephemeral: true
        });
    }
};

function FormatTime(time: number | string): number {
    const defaultTime = 1000 * 60 * 10;
    const maxTime = 2419200000;
    if (typeof time === "string") {
        const regex = /(\d+)(s|m|h|d)/;
        const match = time.match(regex);
        let t = defaultTime;

        if (!match) return t;

        const amount = parseInt(match[1]);
        const type = match[2];

        switch (type) {
            case "s":
                t = amount * 1000;
                break;
            case "m":
                t = amount * 60000;
                break;
            case "h":
                t = amount * 3600000;
                break;
            case "d":
                t = amount * 86400000;
                break;
            default:
                t = defaultTime;
        }

        return Math.max(15000, Math.min(t, maxTime));
    }

    return defaultTime;
}

function FormatTimeToText(milliseconds: number): string {
    const maxTime = 2419200000;

    if (milliseconds > maxTime) {
        milliseconds = maxTime;
    }

    const days = Math.floor(milliseconds / 86400000);
    milliseconds %= 86400000;

    const hours = Math.floor(milliseconds / 3600000);
    milliseconds %= 3600000;

    const minutes = Math.floor(milliseconds / 60000);
    milliseconds %= 60000;

    const seconds = Math.floor(milliseconds / 1000);

    const parts: string[] = [];
    if (days > 0) parts.push(`${days} día${days > 1 ? "s" : ""}`);
    if (hours > 0) parts.push(`${hours} hora${hours > 1 ? "s" : ""}`);
    if (minutes > 0) parts.push(`${minutes} minuto${minutes > 1 ? "s" : ""}`);
    if (seconds > 0) parts.push(`${seconds} segundo${seconds > 1 ? "s" : ""}`);

    return parts.join(", ");
}
