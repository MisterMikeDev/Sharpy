import { GuildMember } from "discord.js";
import { Event } from "../../Interfaces";
import { Config } from "../../Data/Config";

export const event: Event = {
    name: "guildMemberUpdate",
    run: async (Sharpy, oldMember: GuildMember, newMember: GuildMember) => {
        if (oldMember.guild.id !== Config.DiscordBot.EchoesOfTalent.id) return;
        if (oldMember.premiumSince === newMember.premiumSince) return;

        if (oldMember.premiumSince && !newMember.premiumSince) {
            newMember.roles
                .remove(Config.DiscordBot.EchoesOfTalent.roles.AltaSociedad)
                .catch(() => {});
        }
    }
};
