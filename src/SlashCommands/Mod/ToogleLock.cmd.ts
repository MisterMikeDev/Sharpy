import {
    CacheType,
    CommandInteraction,
    CommandInteractionOptionResolver,
    EmbedBuilder,
    GuildMemberRoleManager,
    PermissionFlagsBits,
    PermissionsBitField,
    TextChannel
} from "discord.js";
import { Emojis } from "../../Data/Emojis";
import { Config } from "../../Data/Config";
import { Sharpy } from "../../Client";

export const ToggleLockCommand = async ({
    Sharpy,
    interaction,
    options
}: {
    Sharpy: Sharpy;
    interaction: CommandInteraction<CacheType>;
    options: CommandInteractionOptionResolver;
}) => {
    await interaction.deferReply();

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

    if (!hasRequiredPermissions && !hasRequiredRoles) {
        return await interaction.reply({
            content: `${Emojis.Util.No} | No tienes los permisos necesarios para ejecutar este comando.`,
            ephemeral: true
        });
    }

    const channel = (options.getChannel("canal") ?? interaction.channel) as TextChannel;

    const permissionFlags = [
        PermissionFlagsBits.SendMessages,
        PermissionFlagsBits.SendMessagesInThreads,
        PermissionFlagsBits.CreatePublicThreads,
        PermissionFlagsBits.CreatePrivateThreads,
        PermissionFlagsBits.AddReactions,
        PermissionFlagsBits.Speak,
        PermissionFlagsBits.Connect
    ];

    const everyonePermissions = channel.permissionOverwrites.cache.get(channel.guild.id);

    const isLocked = everyonePermissions
        ? permissionFlags.every((perm) => everyonePermissions.deny.has(perm))
        : false;

    if (isLocked) {
        await channel.permissionOverwrites.edit(channel.guild.id, {
            SendMessages: true,
            SendMessagesInThreads: true,
            CreatePublicThreads: true,
            CreatePrivateThreads: true,
            AddReactions: true,
            Speak: true,
            Connect: true
        });
        await interaction.followUp({
            content: `${Emojis.Util.Yes} | El canal ha sido **desbloqueado**.`,
            embeds: [
                new EmbedBuilder()
                    .setColor("#00FF00")
                    .setDescription(
                        `El canal ${channel} ha sido desbloqueado por ${interaction.user}.`
                    )
                    .setFooter({
                        text: "Echoes of Talent - Canal desbloqueado",
                        iconURL: Sharpy.user!.displayAvatarURL()
                    })
                    .setTimestamp()
            ]
        });
    } else {
        await channel.permissionOverwrites.edit(channel.guild.id, {
            SendMessages: false,
            SendMessagesInThreads: false,
            CreatePublicThreads: false,
            CreatePrivateThreads: false,
            AddReactions: false,
            Speak: false,
            Connect: false
        });
        await interaction.followUp({
            content: `${Emojis.Util.No} | El canal ha sido **bloqueado**.`,
            embeds: [
                new EmbedBuilder()
                    .setColor("#FF0000")
                    .setDescription(
                        `El canal ${channel} ha sido bloqueado por ${interaction.user}.`
                    )
                    .setFooter({
                        text: "Echoes of Talent - Canal bloqueado",
                        iconURL: Sharpy.user!.displayAvatarURL()
                    })
                    .setTimestamp()
            ]
        });
    }
};
