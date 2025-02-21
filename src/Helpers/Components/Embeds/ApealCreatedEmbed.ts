import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } from "discord.js";
import { Sharpy } from "../../../Client";
import { Db } from "../../Db/Apeals";
import { ButtonsId } from "../../Enums";
import { Emojis } from "../../../Data/Emojis";

export const ApealCreatedEmbed = async (Sharpy: Sharpy, apealId: string) => {
    const apeal = await Db.GetApealById(Sharpy, apealId);

    if (!apeal)
        return {
            embed: new EmbedBuilder()
                .setTitle("Apelación no encontrada")
                .setDescription("No se ha encontrado la apelación solicitada.")
                .setColor("#550000")
                .setTimestamp(),
            components: []
        };

    const apealAuthor = await Sharpy.users.fetch(apeal.userId);

    const embed = new EmbedBuilder()
        .setAuthor({
            name: `Apelación de ${apealAuthor.username}`,
            iconURL: apealAuthor.displayAvatarURL(),
            url: `https://discord.com/users/${apeal.userId}`
        })
        .setTitle(`Apelación ${apealId}`)
        .setFields(
            {
                name: "Situación:",
                value: `\`\`\`\n${apeal.situation}\n\`\`\``
            },
            {
                name: "Compromiso:",
                value: `\`\`\`\n${apeal.commitment}\n\`\`\``
            }
        )
        .setColor("#550000")
        .setFooter({
            text: `Echoes of Talent - Apelación creada por ${Sharpy.user!.username}`,
            iconURL: Sharpy.user!.displayAvatarURL()
        })
        .setTimestamp();

    const components = [
        new ActionRowBuilder<ButtonBuilder>().addComponents(
            new ButtonBuilder()
                .setCustomId(ButtonsId.PardonApeal)
                .setLabel("Perdonar")
                .setStyle(ButtonStyle.Success)
                .setEmoji(Emojis.Util.Allow),
            new ButtonBuilder()
                .setCustomId(ButtonsId.DefinitiveBan)
                .setLabel("Ban Definitivo")
                .setStyle(ButtonStyle.Danger)
                .setEmoji(Emojis.Util.Deny)
        )
    ] as any;

    return { embed, components };
};
