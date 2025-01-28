import { Message, PermissionFlagsBits, PermissionsBitField } from "discord.js";
import { Event } from "../../Interfaces";
import { BannedWords } from "../../Data/Data";
import { Config } from "../../Data/Config";

export const event: Event = {
    name: "messageCreate",
    run: async (Sharpy, message: Message) => {
        if (message.author.bot) return;

        const memberPermissions = message.member?.permissions;

        const permissions =
            typeof memberPermissions === "string"
                ? new PermissionsBitField(BigInt(memberPermissions))
                : memberPermissions;

        const requiredPermissions = [PermissionFlagsBits.Administrator];

        const requiredRoles = [
            Config.DiscordBot.EchosOfTalent.roles.PoderesMisticos,
            Config.DiscordBot.EchosOfTalent.roles.Founder,
            Config.DiscordBot.EchosOfTalent.roles.Director,
            Config.DiscordBot.EchosOfTalent.roles.Programador
        ];

        const hasAdminPermission = permissions?.has(requiredPermissions);
        const hasRequiredRole = message.member?.roles.cache.some((role) =>
            requiredRoles.includes(role.id)
        );

        if (!hasAdminPermission && !hasRequiredRole) {
            if (
                BannedWords.some((word) =>
                    message.content.toLocaleLowerCase().includes(word)
                )
            ) {
                message.delete().catch(() => {});
                message.channel
                    .send("No puedes decir esas palabras aquí.")
                    .then((int) => {
                        setTimeout(() => {
                            int.delete().catch(() => {});
                        }, 5000);
                    });
                return;
            }
        }
    }
};
