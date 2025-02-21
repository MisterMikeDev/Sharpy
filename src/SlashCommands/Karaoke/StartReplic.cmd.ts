import {
    CacheType,
    CommandInteraction,
    GuildMember,
    GuildMemberRoleManager,
    Message,
    PermissionFlagsBits,
    PermissionsBitField
} from "discord.js";
import { Sharpy } from "../../Client";
import { Db } from "../../Helpers/Db/Replic";
import { Emojis } from "../../Data/Emojis";
import { CheckIfUserIsInKaraokeVoiceChat, ReplicEmbed } from "../../Helpers";
import { Config } from "../../Data/Config";

export const StartReplicCommand = async ({
    Sharpy,
    interaction
}: {
    Sharpy: Sharpy;
    interaction: CommandInteraction<CacheType>;
}) => {
    const interactionChannel = interaction.channel!;
    let messageID: string | null = null;

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

    if (!hasRequiredPermissions && !hasRequiredRoles)
        return await interaction.followUp({
            content: `${Emojis.Util.No} | No tienes permisos para usar este comando.`,
            ephemeral: true
        });

    const replics = await Db.GetReplics(Sharpy);
    const replicInCurrentChannel = replics.find(
        (r) => r.channelId === interactionChannel.id
    );

    if (!CheckIfUserIsInKaraokeVoiceChat(interaction.member as GuildMember))
        return await interaction.followUp({
            content: `${Emojis.Util.No} | Debes estar en un canal de Karaoke para iniciar una réplica.`,
            ephemeral: true
        });

    if (replicInCurrentChannel) {
        if (replicInCurrentChannel.participants.filter((p) => p).length === 0) {
            await Db.RemoveReplicByChannel(Sharpy, replicInCurrentChannel.channelId);
        } else {
            return await interaction.followUp({
                content: `${Emojis.Util.No} | Ya hay una réplica activa con participantes en este canal.`,
                ephemeral: true
            });
        }
    }

    try {
        const msg = await interaction.followUp({
            content: `${Emojis.Util.Loading} | Iniciando réplica...`
        });

        messageID = msg.id;

        const replic = await Db.CreateReplic(Sharpy, {
            channelId: interactionChannel.id,
            messageId: Math.floor(Math.random() * 1000000).toString()
        });

        const { content, embed, components } = await ReplicEmbed(Sharpy, replic.id);

        await interaction.editReply({
            content,
            embeds: [embed],
            components
        });

        await Db.UpdateReplicMessageId(Sharpy, {
            replicId: replic.id,
            newMessageId: messageID
        });
    } catch (error) {
        console.error(error);

        if (messageID)
            await interactionChannel.messages.delete(messageID).catch(() => {});

        await interaction
            .followUp({
                content: `${Emojis.Util.No} | Ha ocurrido un error al iniciar la réplica.`
            })
            .then((msg: Message) => setTimeout(() => msg.delete().catch(() => {}), 5000));
    }
};
