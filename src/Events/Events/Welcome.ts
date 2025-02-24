import { EmbedBuilder, GuildMember, TextChannel } from "discord.js";
import { Event } from "../../Interfaces";
import { Config } from "../../Data/Config";
import { WelcomeEmbed } from "../../Helpers";

export const event: Event = {
    name: "guildMemberAdd",
    run: async (Sharpy, member: GuildMember) => {
        if (member.guild.id === Config.DiscordBot.EchoesOfTalent.id) {
            const welcomeChannel = (await Sharpy.channels.fetch(
                Config.DiscordBot.EchoesOfTalent.channels.Bienvenida
            )) as TextChannel;
            const generalChannel = (await Sharpy.channels.fetch(
                Config.DiscordBot.EchoesOfTalent.channels.General
            )) as TextChannel;

            try {
                const user = member.user;
                const embeds = [WelcomeEmbed(user)];

                await generalChannel.send({
                    embeds: [
                        new EmbedBuilder()
                            .setAuthor({
                                name: user.globalName!,
                                iconURL: user.displayAvatarURL()
                            })
                            .setDescription(
                                `¡Bienvenido <@${member.id}> a **Echoes Of Talent**! 🎉`
                            )
                            .setColor("#550000")
                            .setFooter({
                                text: "Echoes Of Talent | Bienvenida",
                                iconURL: Sharpy.user!.displayAvatarURL()
                            })
                            .setTimestamp()
                    ]
                });

                await welcomeChannel.send({
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
