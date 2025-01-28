import { ButtonBuilder, ButtonStyle } from "discord.js";
import { ButtonsId } from "../../Enums";
import { EmojisIds } from "../../../Data/Emojis";

export const VerifyCloseTicketButton = new ButtonBuilder()
    .setCustomId(ButtonsId.VerifyCloseTicket)
    .setLabel("Cerrar Ticket")
    .setEmoji(EmojisIds.Util.No)
    .setStyle(ButtonStyle.Danger);
