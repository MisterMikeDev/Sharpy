import { GuildMember } from "discord.js";
import { Config } from "../../Data/Config";

export function CheckIfUserIsInKaraokeVoiceChat(member: GuildMember) {
    const karaokeChannels = [
        Config.DiscordBot.EchosOfTalent.channels.Karaoke1,
        Config.DiscordBot.EchosOfTalent.channels.Karaoke2,
        Config.DiscordBot.EchosOfTalent.channels.Karaoke3,
        Config.DiscordBot.EchosOfTalent.channels.Karaoke4,
        Config.DiscordBot.EchosOfTalent.channels.Karaoke5,
        Config.DiscordBot.EchosOfTalent.channels.Karaoke6,
        Config.DiscordBot.EchosOfTalent.channels.Karaoke7
    ];

    const memberVoiceChannel = member.voice.channel;

    if (!memberVoiceChannel) return false;

    return karaokeChannels.includes(memberVoiceChannel.id);
}
