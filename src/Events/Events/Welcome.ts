import { GuildMember, TextChannel } from "discord.js";
import { Event } from "../../Interfaces";
import { Config } from "../../Data/Config";
import { WelcomeEmbed } from "../../Helpers";

export const event: Event = {
    name: "guildMemberAdd",
    run: async (Sharpy, member: GuildMember) => {
        if (member.guild.id === Config.DiscordBot.EchoesOfTalent.id) {
            const channel = (await Sharpy.channels.fetch(
                Config.DiscordBot.EchoesOfTalent.channels.General
            )) as TextChannel;

            try {
                const user = member.user;
                const embeds = [WelcomeEmbed(user)];

                await channel.send({
                    content: `¡Bienvenido <@${member.id}> a 𝐄𝐂𝐇𝐎𝐄𝐒 𝐎𝐅 𝐓𝐀𝐋𝐄𝐍𝐓! 🎉`,
                    embeds
                });

                await member.roles
                    .add(Config.DiscordBot.EchoesOfTalent.roles.Miembro)
                    .catch(() => {});
                await member.roles
                    .add(Config.DiscordBot.EchoesOfTalent.roles.AboutSeparador)
                    .catch(() => {});
                await member.roles
                    .add(Config.DiscordBot.EchoesOfTalent.roles.LevelsSeparador)
                    .catch(() => {});
                await member.roles
                    .add(Config.DiscordBot.EchoesOfTalent.roles.ExtraSeparador)
                    .catch(() => {});
                await member.roles
                    .add(Config.DiscordBot.EchoesOfTalent.roles.LevelText0)
                    .catch(() => {});
                await member.roles
                    .add(Config.DiscordBot.EchoesOfTalent.roles.LevelVoice0)
                    .catch(() => {});
                await member.roles
                    .add(Config.DiscordBot.EchoesOfTalent.roles.Novato)
                    .catch(() => {});
            } catch (error) {
                console.error(`No se pudo enviar el mensaje de bienvenida: ${error}`);
            }

            return;
        }

        if (member.guild.id === Config.DiscordBot.EchoesOfTalent.apealServerId) {
            try {
                await member.roles
                    .add(Config.DiscordBot.EchoesOfTalent.roles.BaneadoApeal)
                    .catch(() => {});
            } catch (error) {
                console.error(`No se pudo asignar el rol de Baneado: ${error}`);
            }

            return;
        }
    }
};
