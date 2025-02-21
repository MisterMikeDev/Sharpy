import {
    CacheType,
    ChannelType,
    Collection,
    CommandInteraction,
    CommandInteractionOptionResolver,
    EmbedBuilder,
    ForumChannel,
    GuildMember,
    GuildMemberRoleManager,
    PermissionFlagsBits,
    PermissionsBitField,
    StageChannel,
    TextChannel,
    VoiceChannel
} from "discord.js";
import { Emojis } from "../../Data/Emojis";
import { Sharpy } from "../../Client";
import { Config } from "../../Data/Config";

export const GetRandomUserCommand = async ({
    Sharpy,
    interaction,
    options
}: {
    Sharpy: Sharpy;
    interaction: CommandInteraction<CacheType>;
    options: CommandInteractionOptionResolver;
}) => {
    await interaction.deferReply({ ephemeral: true });

    const channel = (options.getChannel("channel") ?? interaction.channel) as
        | StageChannel
        | TextChannel
        | VoiceChannel
        | ForumChannel;

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

    const channelType = channel.type;

    let members: Collection<string, GuildMember> | undefined;
    if (channelType === ChannelType.GuildVoice)
        members = channel.members.filter((member) => !member.user.bot);
    if (channelType === ChannelType.GuildStageVoice)
        members = channel.members.filter((member) => member.voice.suppress);
    if (channelType === ChannelType.GuildText)
        members = channel.members.filter((member) => !member.user.bot);
    if (channelType === ChannelType.GuildForum)
        members = channel.members.filter((member) => !member.user.bot);

    if (!members || members.size < 1) {
        return await interaction.followUp({
            content: `${Emojis.Util.No} | No se encontraron miembros en el canal.`,
            ephemeral: true
        });
    }

    const randomMember = members.random();

    if (!randomMember) {
        return await interaction.followUp({
            content: `${Emojis.Util.No} | No se encontró un miembro aleatorio.`,
            ephemeral: true
        });
    }

    await interaction.followUp({
        embeds: [
            new EmbedBuilder()
                .setColor("#550000")
                .setAuthor({
                    name: randomMember.user.globalName!,
                    iconURL: randomMember.user.displayAvatarURL()
                })
                .setDescription(`¡El miembro aleatorio es <@${randomMember.id}>!`)
                .setFooter({
                    text: "Echoes Of Talent | Elección aleatoria de miembro",
                    iconURL: Sharpy.user!.displayAvatarURL()
                })
                .setTimestamp()
        ]
    });
};
