import {
    GuildMember,
    GuildMemberRoleManager,
    PermissionFlagsBits,
    PermissionsBitField
} from "discord.js";
import { ButtonsId, CheckIfUserIsInKaraokeVoiceChat, sleep } from "../../Helpers";
import { ButtonEvent } from "../../Interfaces";
import { Emojis } from "../../Data/Emojis";
import { Config } from "../../Data/Config";

export const buttonEvent: ButtonEvent = {
    id: ButtonsId.FocusQueue,
    run: async (Sharpy, interaction) => {
        await interaction.deferUpdate();

        const interactionChannel = interaction.channel!;
        const currentQueue = Sharpy.queue.get(interactionChannel.id);

        if (!CheckIfUserIsInKaraokeVoiceChat(interaction.member as GuildMember))
            return await interaction.followUp({
                content: `${Emojis.Util.No} | Debes estar en un canal de Karaoke.`,
                ephemeral: true
            });

        if ((interaction.member as GuildMember).voice.channelId !== interactionChannel.id)
            return await interaction.followUp({
                content: `${Emojis.Util.No} | Debes estar en el canal de voz de la lista.`,
                ephemeral: true
            });

        if (!currentQueue) {
            return await interaction.followUp({
                content: `${Emojis.Util.No} | No hay ninguna lista en este canal.`,
                ephemeral: true
            });
        }

        const memberPermissions = interaction.member?.permissions;

        const permissions =
            typeof memberPermissions === "string"
                ? new PermissionsBitField(BigInt(memberPermissions))
                : memberPermissions;

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

        const hasRequiredPermissions = requiredPermissions.some((permission) =>
            permissions?.has(permission)
        );

        let hasRequiredRoles = false;

        if (interaction.member?.roles instanceof GuildMemberRoleManager)
            hasRequiredRoles = interaction.member.roles.cache.some((role) =>
                requiredRoles.includes(role.id)
            );
        else if (Array.isArray(interaction.member?.roles))
            hasRequiredRoles = interaction.member.roles.some((roleId) =>
                requiredRoles.includes(roleId)
            );

        if (!hasRequiredPermissions || !hasRequiredRoles) {
            return await interaction.followUp({
                content: `${Emojis.Util.No} | No tienes permisos para hacer eso.`,
                ephemeral: true
            });
        }

        const { focus } = currentQueue;

        const voiceChannel = (interaction.member as GuildMember).voice.channel;

        if (!voiceChannel)
            return await interaction.followUp({
                content: `${Emojis.Util.No} | No estás en un canal de voz.`,
                ephemeral: true
            });

        const members = voiceChannel.members
            .filter((member) => !member.user.bot)
            .filter((member) => member.id !== currentQueue.list[0]?.id);

        await Sharpy.SetFocusQueue(interactionChannel.id, !focus);

        await Sharpy.UpdateQueueInCurrentChannel(currentQueue.id);

        members.forEach(async (member) => {
            await member.voice.setMute(!focus).catch(() => {});
            await sleep(500);
        });
    }
};
