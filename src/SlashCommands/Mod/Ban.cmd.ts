import {
    CacheType,
    CommandInteraction,
    CommandInteractionOptionResolver,
    GuildMemberRoleManager,
    PermissionFlagsBits,
    PermissionsBitField
} from "discord.js";
import { Emojis } from "../../Data/Emojis";
import { Config } from "../../Data/Config";
import { Sharpy } from "../../Client";
import { ApealBanEmbed } from "../../Helpers";
import { Db } from "../../Helpers/Db/Apeals";

const maxTime = 1209600000; // 14 days

export const BanCommand = async ({
    Sharpy,
    interaction,
    options
}: {
    Sharpy: Sharpy;
    interaction: CommandInteraction<CacheType>;
    options: CommandInteractionOptionResolver;
}) => {
    await interaction.deferReply();
    const user = options.getUser("user");
    const userId = options.getString("user-id");
    const reason = options.getString("reason") || "No se especificó una razón.";
    const timeNeededToAppeal = options.getString("time") || "3d";
    const canApeal = options.getBoolean("can-apeal") || false;
    const guild = interaction.guild!;

    const memberPermissions = interaction.member?.permissions;
    const requiredPermissions = [PermissionFlagsBits.Administrator];
    const requiredRoles = [
        Config.DiscordBot.EchoesOfTalent.roles.PoderesMisticos,
        Config.DiscordBot.EchoesOfTalent.roles.Founder,
        Config.DiscordBot.EchoesOfTalent.roles.Director,
        Config.DiscordBot.EchoesOfTalent.roles.Programador,
        Config.DiscordBot.EchoesOfTalent.roles.Admin
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
            content: `${Emojis.Util.No} | No tienes los permisos necesarios para ejecutar este comando.`,
            ephemeral: true
        });
    }

    if (!user || !userId) {
        return await interaction.followUp({
            content: `${Emojis.Util.No} | Debes mencionar a un usuario o proporcionar su ID.`,
            ephemeral: true
        });
    }

    const member = guild.members.cache.get(user.id) || guild.members.cache.get(userId);

    if (!member)
        return await interaction.followUp({
            content: `${Emojis.Util.No} | No se ha encontrado al usuario.`,
            ephemeral: true
        });

    if (
        member.roles.highest.position >= Number(interaction.guild?.roles.highest.position)
    )
        return await interaction.followUp({
            content: `${Emojis.Util.No} | No puedes banear a un usuario con un rol igual o superior al tuyo.`,
            ephemeral: true
        });

    const time = FormatTime(timeNeededToAppeal);
    const textTime = FormatTimeToText(time);

    try {
        let preapeal: {
            id: string;
            userId: string;
            reason: string;
            timeNeededToApeal: number;
            createdAt: Date;
            updatedAt: Date;
        } | null = null;

        const { embed } = ApealBanEmbed(Sharpy, {
            user: member.user,
            time: textTime,
            reason
        });

        if (canApeal) {
            await member.user
                .send({
                    content: "Has sido baneado de **Echoes of Talent**",
                    embeds: [embed]
                })
                .then(async () => {
                    preapeal = await Db.CreatePreApeal(Sharpy, {
                        userId: member.id,
                        reason,
                        timeNeededToApeal: time
                    });
                })
                .catch(() => {});
        }

        await guild.members.ban(member, { reason });

        await interaction.followUp({
            content: `${Emojis.Util.Yes} | ${member.user.tag} ha sido baneado y tiene que esperar **${textTime}** para apelar.\n> ${!preapeal && "No se puedo hacer el pre-apeal."}`
        });
    } catch (error) {
        console.error(`No se pudo banear al usuario: ${error}`);
        await interaction.followUp({
            content: `${Emojis.Util.No} | No se pudo banear al usuario.`
        });
    }
};

function FormatTime(time: number | string): number {
    const minTime = 1000 * 60 * 5; // 5 minutes
    const defaultTime = 1000 * 60 * 60 * 24 * 3; // 3 days
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

        return Math.max(minTime, Math.min(t, maxTime));
    }

    return defaultTime;
}

function FormatTimeToText(milliseconds: number): string {
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
