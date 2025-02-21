import { EmbedBuilder, User } from "discord.js";
import { Sharpy } from "../../../Client";
import { Emojis } from "../../../Data/Emojis";
import { Config } from "../../../Data/Config";

export const BoostMessageEmbed = (Sharpy: Sharpy, user: User) => {
    const content = `¡Muchas gracias <@${user.id}> por tu boost!`;
    const embed = new EmbedBuilder()
        .setDescription(
            `# ${Emojis.Echo.Impulso} ¡Gracias por tu boost!\n\nAgredecemos tu apoyo a la comunidad, con tu boost nos ayudas a crecer y a mejorar la calidad de los servicios que ofrecemos.\n> *Recuerda que tienes acceso a los beneficios de boost en el servidor, puedes verlos en <#${Config.DiscordBot.EchoesOfTalent.channels.InfoBooster}>.*`
        )
        .setColor("#fd6cf7")
        .setFooter({
            iconURL: Sharpy.user!.displayAvatarURL(),
            text: `Echoes of Talent | ${Sharpy.user!.username}`
        })
        .setTimestamp()
        .setImage(
            "https://cdn.discordapp.com/attachments/1313715864511709184/1313988906299035728/Echoes_of_talent.png?ex=676b2f87&is=6769de07&hm=60f408572c7a639e739697cc9773ba2f25b265e4b8abb025f5d8dc061a12b5c4&"
        )
        .setThumbnail(
            "https://images-ext-1.discordapp.net/external/NlWX7E8BeNEX6T02rAGV_d4kpevOuzsrIbacE5bj0IY/%3Fsize%3D128/https/cdn.discordapp.com/emojis/733980018408947763.webp?format=webp&width=115&height=115"
        );

    return { content, embed };
};
