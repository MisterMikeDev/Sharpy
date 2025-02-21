import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } from "discord.js";
import { Sharpy } from "../../../Client";
import { InfoApealData } from "../../../Data/Data";
import { Config } from "../../../Data/Config";
import { Emojis, EmojisIds } from "../../../Data/Emojis";
import { ButtonsId } from "../../Enums";

export const InfoApeal = ({ Sharpy }: { Sharpy: Sharpy }) => {
    const { title, description, color, sections } = InfoApealData;

    const desc = `# ${title}\n${description}\n\n${sections
        .map((section) => {
            return `## ${section.title}\n${section.prefix}${section.fields.join("\n" + section.prefix)}`;
        })
        .join("\n\n")}`;

    const embed = new EmbedBuilder().setColor(color).setDescription(desc).setFooter({
        text: "Echoes of Talent | Información de Apelaciones",
        iconURL: Sharpy.user!.displayAvatarURL()
    });

    return { embed };
};

export const CreateApealEmbed = ({ Sharpy }: { Sharpy: Sharpy }) => {
    const embed = new EmbedBuilder()
        .setColor("#550000")
        .setDescription(
            `# ${Emojis.Echo.Judge} ¡Crea una Apelación! ${Emojis.Echo.Judge}\nPara crear una apelación, te pedimos que primero leas la información de <#${Config.DiscordBot.EchoesOfTalent.channels.InfoApeals}>.\n\n> ${Emojis.Echo.AnimatedArrowRed} Una vez leída, puedes dar click en el botón de abajo para crear una apelación.`
        )
        .setFooter({
            text: "Echoes of Talent | Crear Apelación",
            iconURL: Sharpy.user!.displayAvatarURL()
        });
    const components = [
        new ActionRowBuilder<ButtonBuilder>().addComponents([
            new ButtonBuilder()
                .setCustomId(ButtonsId.CreateApeal)
                .setEmoji(EmojisIds.Echo.BanHammer)
                .setLabel("Crear Apelación")
                .setStyle(ButtonStyle.Secondary)
        ])
    ] as any;

    return { embed, components };
};
