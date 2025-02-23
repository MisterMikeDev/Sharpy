import { GuildMember } from "discord.js";
import { Config } from "../../Data/Config";

export function CheckIfUserIsInKaraokeVoiceChat(member: GuildMember) {
    const karaokeChannels = [
        Config.DiscordBot.EchoesOfTalent.channels.Karaoke1,
        Config.DiscordBot.EchoesOfTalent.channels.Karaoke2,
        Config.DiscordBot.EchoesOfTalent.channels.Karaoke3,
        Config.DiscordBot.EchoesOfTalent.channels.Karaoke4,
        Config.DiscordBot.EchoesOfTalent.channels.Karaoke5,
        Config.DiscordBot.EchoesOfTalent.channels.Karaoke6,
        Config.DiscordBot.EchoesOfTalent.channels.Karaoke7,
        Config.DiscordBot.EchoesOfTalent.channels.BeatboxRap1,
        Config.DiscordBot.EchoesOfTalent.channels.BeatboxRap2,
        Config.DiscordBot.EchoesOfTalent.channels.BeatboxRap3,
        Config.DiscordBot.EchoesOfTalent.channels.Stage
    ];

    const memberVoiceChannel = member.voice.channel;

    if (!memberVoiceChannel) return false;

    return karaokeChannels.includes(memberVoiceChannel.id);
}
