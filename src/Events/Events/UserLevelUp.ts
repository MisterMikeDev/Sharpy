import { Event } from "../../Interfaces";
import { EmbedBuilder, GuildMember, TextChannel } from "discord.js";
import { Config } from "../../Data/Config";

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
            Config.DiscordBot.EchosOfTalent.channels.Niveles
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
    }
};
