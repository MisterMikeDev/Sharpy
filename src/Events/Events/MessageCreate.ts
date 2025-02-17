import { Message, PermissionFlagsBits, PermissionsBitField } from "discord.js";
import { Event } from "../../Interfaces";
import { BannedWords } from "../../Data/Data";
import { Config } from "../../Data/Config";
import { CalcXpForMessage, GetCountOfBoostThisServer } from "../../Helpers";
import { Db } from "../../Helpers/Db/LevelSystem";

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
                    .then((int: Message) => {
                        setTimeout(() => {
                            int.delete().catch(() => {});
                        }, 5000);
                    });
                return;
            }
        }

        // Sistema de XP
        const textXpAllowChannels = Object.values(
            Config.DiscordBot.EchosOfTalent.xpTextChannels
        );

        if (textXpAllowChannels.includes(message.channel.id)) {
            if (message.author.id !== "437308398845952001") return; // DEBUG
            const messageContent = message.content;
            const messageMember = message.member!;
            const boostCount = GetCountOfBoostThisServer(messageMember);

            let multiplier = 1;
            if (boostCount === 1) multiplier = 1.25;
            else if (boostCount === 2) multiplier = 1.5;

            const xp = CalcXpForMessage(messageContent, multiplier);

            const xpUser = await Db.GetUserByUserId(Sharpy, messageMember.id);

            if (!xpUser) await Db.CreateUser(Sharpy, messageMember.id);

            const { leveledUp, level } = await Db.AddXpToUser(
                Sharpy,
                messageMember.id,
                xp
            );

            if (leveledUp)
                Sharpy.emit("userLevelUp", {
                    member: messageMember,
                    type: "text",
                    level
                });
        }
    }
};
