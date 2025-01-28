import { EmbedBuilder } from "discord.js";
import { Sharpy } from "../../../Client";
import { Emojis } from "../../../Data/Emojis";

export const ManualEventEmbed = ({ Sharpy }: { Sharpy: Sharpy }) => {
    const embed = new EmbedBuilder()
        .setDescription(
            `# Manual de Eventos ${Emojis.Echo.GoldenShimmer}\n\n***En este documento podras encontrar las caracteristicas principales para poder llevar a cabo eventos de canto en Echoes Of Talent.***`
        )
        .setColor("#550000")
        .setFooter({
            text: "Echoes Of Talent | Manual de Eventos",
            iconURL: Sharpy.user!.displayAvatarURL()
        });

    const file = [
        {
            attachment: "./public/ManualDeEventos.pdf",
            contentType: "application/pdf",
            name: "Manual_De_Eventos.pdf"
        }
    ];

    return { embed, file };
};
