import {
    GuildMemberRoleManager,
    PermissionFlagsBits,
    PermissionsBitField
} from "discord.js";
import { ButtonsId } from "../../Helpers";
import { ButtonEvent } from "../../Interfaces";
import { Emojis } from "../../Data/Emojis";

export const buttonEvent: ButtonEvent = {
    id: ButtonsId.RestartQueue,
    run: async (Sharpy, interaction) => {
        await interaction.deferUpdate();

        const interactionChannel = interaction.channel!;
        const currentQueue = Sharpy.queue.get(interactionChannel.id);

        if (!currentQueue) {
            return await interaction
                .followUp({
                    content: `${Emojis.Util.Yes} | No hay ninguna lista en este canal.`
                })
                .then((int) => {
                    setTimeout(async () => {
                        await int.delete().catch(() => {});
                    }, 5000);
                });
        }

        const memberPermissions = interaction.member?.permissions;

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

        if (interaction.member?.roles instanceof GuildMemberRoleManager)
            hasRequiredRoles = interaction.member.roles.cache.some((role) =>
                requiredRoles.includes(role.id)
            );
        else if (Array.isArray(interaction.member?.roles))
            hasRequiredRoles = interaction.member.roles.some((roleId) =>
                requiredRoles.includes(roleId)
            );

        if (!hasRequiredPermissions || !hasRequiredRoles) {
            return await interaction
                .followUp({
                    content: `${Emojis.Util.Yes} | No tienes los permisos o roles necesarios para reiniciar la lista.`
                })
                .then((int) => {
                    setTimeout(async () => {
                        await int.delete().catch(() => {});
                    }, 5000);
                });
        }

        const modifyQueue = {
            ...currentQueue,
            list: []
        };

        Sharpy.ModifyQueue(interactionChannel.id, modifyQueue.list);

        Sharpy.UpdateQueueInCurrentChannel(interactionChannel.id);

        await interaction
            .followUp({
                content: `${Emojis.Util.Yes} | Reiniciando la lista.`
            })
            .then((int) => {
                setTimeout(async () => {
                    await int.delete().catch(() => {});
                }, 5000);
            });
    }
};
