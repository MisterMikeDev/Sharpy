import { Event } from "../../Interfaces";
import { EmbedBuilder, GuildMember, TextChannel } from "discord.js";
import { Config } from "../../Data/Config";
import { TextLevels, VoiceLevels, VoiceRankLevels } from "../../Data/Data";

export const event: Event = {
    name: "userLevelUp",
    run: async (
        Sharpy,
        {
            member,
            type,
            level
        }: {
            member: GuildMember;
            type: "text" | "voice";
            level: number;
        }
    ) => {
        const channel = (await Sharpy.channels.fetch(
            Config.DiscordBot.EchoesOfTalent.channels.Niveles
        )) as TextChannel;

        if (!channel) return;

        const user = await Sharpy.users.fetch(member.id);
        const levelUpMessage = `¡Felicidades ${user.username}, has subido a nivel **${level}** en ${type === "text" ? "TextChat" : "VoiceChat"}!`;

        channel.send({
            content: `<@${member.id}>`,
            embeds: [
                new EmbedBuilder()
                    .setTitle("🎉 ¡Nivel alcanzado! 🎉")
                    .setDescription(`🎉 ${levelUpMessage} 🎉`)
                    .setColor(type === "text" ? "#550000" : "#e9c430")
                    .setFooter({
                        text: `Echoes of Talent | Subida de nivel en ${type === "text" ? "TextChat" : "VoiceChat"}`,
                        iconURL: user.displayAvatarURL()
                    })
                    .setTimestamp()
            ],
            allowedMentions: { parse: ["users"] }
        });

        const Levels = type === "text" ? TextLevels : VoiceLevels;
        const RankLevels = VoiceRankLevels;

        const levelKeys = Object.keys(Levels)
            .map(Number)
            .sort((a, b) => b - a);

        const rankLevelKeys = Object.keys(RankLevels)
            .map(Number)
            .sort((a, b) => b - a);

        const newRoleId: string | undefined = levelKeys.find((lvl) => level >= lvl)
            ? Levels[levelKeys.find((lvl) => level >= lvl)!]
            : undefined;

        const newRankRoleId: string | undefined = rankLevelKeys.find(
            (lvl) => level >= lvl
        )
            ? RankLevels[rankLevelKeys.find((lvl) => level >= lvl)!]
            : undefined;

        if (!newRoleId && !newRankRoleId) return;

        const oldRoles: string[] = member.roles.cache
            .filter(
                (role) =>
                    (levelKeys.some((lvl) => Levels[lvl] === role.id) &&
                        role.id !== newRoleId) ||
                    (rankLevelKeys.some((lvl) => RankLevels[lvl] === role.id) &&
                        role.id !== newRankRoleId)
            )
            .map((role) => role.id);

        oldRoles.forEach(async (roleId) => {
            await member.roles.remove(roleId).catch(() => null);
        });

        if (newRoleId) await member.roles.add(newRoleId).catch(() => null);
        if (newRankRoleId) await member.roles.add(newRankRoleId).catch(() => null);
    }
};
