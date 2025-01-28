import {
    PermissionFlagsBits,
    GuildMemberRoleManager,
    PermissionsBitField
} from "discord.js";
import { ButtonsId, GetCountOfBoostThisServer } from "../../Helpers";
import { ButtonEvent } from "../../Interfaces";
import { Emojis } from "../../Data/Emojis";

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
            return await interaction
                .followUp({
                    content: `${Emojis.Util.No} | No hay ninguna cola en este canal.`
                })
                .then((int) => {
                    setTimeout(async () => {
                        await int.delete().catch(() => {});
                    }, 5000);
                });
        }

        if (currentQueue.list[0].id === interactionUser.id) {
            return await interaction
                .followUp({
                    content: `${Emojis.Util.No} | No puedes votar para saltarte a ti mismo.`
                })
                .then((int) => {
                    setTimeout(async () => {
                        await int.delete().catch(() => {});
                    }, 5000);
                });
        }

        const memberPermissions = interactionMember.permissions;

        const permissions =
            typeof memberPermissions === "string"
                ? new PermissionsBitField(BigInt(memberPermissions))
                : memberPermissions;

        const requiredPermissions = [PermissionFlagsBits.Administrator];
        const requiredRoles = [
            "1308432429824086026", // Poderes misticos
            "1307748890254250064", // Founder
            "1307804113425272994", // Director
            "1312909219728593018", // Programador
            "1312909148110717059", // Admin
            "1312909103424606279", // Supervisor
            "1312909535169744956" // Moderator
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

            return await interaction
                .followUp({
                    content: `${Emojis.Util.Yes} | Saltando turno directamente.`
                })
                .then((int) => {
                    setTimeout(async () => {
                        await int.delete().catch(() => {});
                    }, 5000);
                });
        }

        const alreadyVoted = currentQueue.skipVoteList.some(
            (vote) => vote.user.id === interactionUser.id
        );

        if (alreadyVoted) {
            return await interaction
                .followUp({
                    content: `${Emojis.Util.No} | Ya has votado para saltar el turno.`
                })
                .then((int) => {
                    setTimeout(async () => {
                        await int.delete().catch(() => {});
                    }, 5000);
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

        return await interaction
            .followUp({
                content: followUpMessage
            })
            .then((int) => {
                setTimeout(async () => {
                    await int.delete().catch(() => {});
                }, 5000);
            });
    }
};
