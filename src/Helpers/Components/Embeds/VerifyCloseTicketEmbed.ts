import { ActionRowBuilder, ButtonBuilder, EmbedBuilder } from "discord.js";
import { VerifyCloseTicketButton } from "../Buttons";

export const VerifyCloseTicketEmbed = () => {
    const embed = new EmbedBuilder()
        .setTitle("¿Estás seguro de que quieres cerrar este ticket?")
        .setDescription(
            "Si estás seguro de que quieres cerrar este ticket, presiona el botón de abajo."
        )
        .setColor("#5865f2");

    const components = [
        new ActionRowBuilder<ButtonBuilder>().addComponents([VerifyCloseTicketButton])
    ] as any;

    return { embed, components };
};
