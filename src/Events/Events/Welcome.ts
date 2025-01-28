import { GuildMember, TextChannel } from "discord.js";
import { Event } from "../../Interfaces";
import { Config } from "../../Data/Config";
import { WelcomeEmbed } from "../../Helpers";

export const event: Event = {
    name: "guildMemberAdd",
    run: async (Sharpy, member: GuildMember) => {
        const channel = Sharpy.guilds.cache
            .get(Config.DiscordBot.EchosOfTalent.id)
            ?.channels.cache.get(Config.DiscordBot.EchosOfTalent.channels.General);

        if (!channel || !(channel instanceof TextChannel)) return;

        try {
            const user = member.user;
            await channel.send({
                content: `¡Bienvenido <@${member.id}> a 𝐄𝐂𝐇𝐎𝐄𝐒 𝐎𝐅 𝐓𝐀𝐋𝐄𝐍𝐓! 🎉`,
                embeds: [WelcomeEmbed(user)]
            });
        } catch (error) {
            console.error(`No se pudo enviar el mensaje de bienvenida: ${error}`);
        }
    }
};
