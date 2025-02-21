import {
    PermissionFlagsBits,
    GuildMemberRoleManager,
    PermissionsBitField
} from "discord.js";
import { ButtonsId, GetCountOfBoostThisServer } from "../../Helpers";
import { ButtonEvent } from "../../Interfaces";
import { Emojis } from "../../Data/Emojis";
import { Config } from "../../Data/Config";

export const buttonEvent: ButtonEvent = {
    id: ButtonsId.SkipQueue,
    run: async (Sharpy, interaction) => {
        await interaction.deferUpdate();

        const interactionChannel = interaction.channel!;
        const interactionUser = interaction.user;
        const interactionMember = interaction.member!;
        const currentQueue = Sharpy.queue.get(interactionChannel.id);
        const userIsBoosterLvl2 = GetCountOfBoostThisServer(interactionMember) >= 2;

        if (!currentQueue) {
            return await interaction.followUp({
                content: `${Emojis.Util.No} | No hay ninguna lista en este canal.`,
                ephemeral: true
            });
        }

        if (currentQueue.list[0].id === interactionUser.id) {
            return await interaction.followUp({
                content: `${Emojis.Util.No} | No puedes votar para saltarte a ti mismo.`,
                ephemeral: true
            });
        }

        const memberPermissions = interactionMember.permissions;

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

        if (interactionMember?.roles instanceof GuildMemberRoleManager)
            hasRequiredRoles = interactionMember.roles.cache.some((role) =>
                requiredRoles.includes(role.id)
            );
        else if (Array.isArray(interactionMember?.roles))
            hasRequiredRoles = interactionMember.roles.some((roleId) =>
                requiredRoles.includes(roleId)
            );

        if (hasRequiredPermissions || hasRequiredRoles) {
            const modifyQueue = {
                ...currentQueue,
                list: currentQueue.list.slice(1),
                skipVoteList: []
            };

            Sharpy.ModifyQueue(interactionChannel.id, modifyQueue.list);
            Sharpy.UpdateQueueInCurrentChannel(interactionChannel.id);

            return await interaction.followUp({
                content: `${Emojis.Util.Yes} | Saltando turno directamente.`,
                ephemeral: true
            });
        }

        const alreadyVoted = currentQueue.skipVoteList.some(
            (vote) => vote.user.id === interactionUser.id
        );

        if (alreadyVoted) {
            return await interaction.followUp({
                content: `${Emojis.Util.No} | Ya has votado para saltar el turno.`,
                ephemeral: true
            });
        }

        const voteWeight = userIsBoosterLvl2 ? 2 : 1;
        currentQueue.skipVoteList.push({ user: interactionUser, weight: voteWeight });

        const totalVotes = currentQueue.skipVoteList.reduce(
            (sum, vote) => sum + vote.weight,
            0
        );
        const totalUsers = currentQueue.list.length - 1;
        const requiredVotes = Math.ceil(totalUsers * 0.8);

        let followUpMessage = `${Emojis.Util.Loading} | Voto registrado. (${totalVotes}/${requiredVotes} votos necesarios para saltar el turno).\n`;

        if (userIsBoosterLvl2) {
            followUpMessage += `> ${Emojis.Echo.Impulso} | Tu voto cuenta como doble por ser un booster de nivel 2.`;
        }

        if (totalVotes >= requiredVotes) {
            const modifyQueue = {
                ...currentQueue,
                list: currentQueue.list.slice(1),
                skipVoteList: []
            };

            Sharpy.ModifyQueue(interactionChannel.id, modifyQueue.list);
            Sharpy.UpdateQueueInCurrentChannel(interactionChannel.id);

            followUpMessage = `${Emojis.Util.Yes} | El turno ha sido saltado debido a los votos.`;
        }

        return await interaction.followUp({
            content: followUpMessage,
            ephemeral: true
        });
    }
};
