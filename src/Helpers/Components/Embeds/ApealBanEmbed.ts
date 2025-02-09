import { EmbedBuilder, User } from "discord.js";
import { Sharpy } from "../../../Client";

export const ApealBanEmbed = (
    Sharpy: Sharpy,
    {
        user,
        time,
        reason
    }: {
        user: User;
        time: string;
        reason: string;
    }
) => {
    const embed = new EmbedBuilder()
        .setAuthor({
            name: "Has sido baneado de Echoes of Talent",
            iconURL: user.displayAvatarURL()
        })
        .setDescription(
            `Has sido baneado de **Echoes of Talent** por **${time}**. Si quieres apelar tu baneo, puedes [hacer click aquí](https://discord.gg/WpzzZKA4J9) y unirte a nuestro servidor de apelaciones.`
        )
        .setFields(
            {
                name: "Razón",
                value: reason,
                inline: true
            },
            {
                name: "Tiempo para poder apelar",
                value: time,
                inline: true
            }
        )
        .setFooter({
            text: "Echoes of Talent | Baneado",
            iconURL: Sharpy.user!.displayAvatarURL()
        })
        .setColor("#550000");

    return { embed };
};
