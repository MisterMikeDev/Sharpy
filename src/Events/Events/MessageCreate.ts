import {
    Message,
    PermissionFlagsBits,
    PermissionsBitField,
    TextChannel
} from "discord.js";
import { Event } from "../../Interfaces";
import { BannedWords } from "../../Data/Data";
import { Config } from "../../Data/Config";
import {
    CalcXpForMessage,
    GetCountOfBoostThisServer,
    StaffPresentation
} from "../../Helpers";
import { Db } from "../../Helpers/Db/LevelSystem";
import { Emojis } from "../../Data/Emojis";

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
            Config.DiscordBot.EchoesOfTalent.roles.PoderesMisticos,
            Config.DiscordBot.EchoesOfTalent.roles.Founder,
            Config.DiscordBot.EchoesOfTalent.roles.Director,
            Config.DiscordBot.EchoesOfTalent.roles.Programador
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
            Config.DiscordBot.EchoesOfTalent.xpTextChannels
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

        // Presentate Staff
        if (
            message.channel.id ===
            Config.DiscordBot.EchoesOfTalent.channels.PresentateStaff
        ) {
            if (message.author.bot) return;

            const presentateStaffChannel = (await Sharpy.channels.fetch(
                Config.DiscordBot.EchoesOfTalent.channels.PresentateStaff
            )) as TextChannel;

            if (!presentateStaffChannel) return;

            const { embed } = await StaffPresentation({ Sharpy, message });

            await message.delete().catch(() => {});

            presentateStaffChannel
                .send({ embeds: [embed] })
                .then((m) => {
                    m.react(`${Emojis.Echo.GatoHappyMeme}`);
                    m.react(`${Emojis.Echo.MexicanCat}`);
                    m.react(`${Emojis.Echo.Smile}`);
                })
                .catch(() => {});
        }
    }
};
