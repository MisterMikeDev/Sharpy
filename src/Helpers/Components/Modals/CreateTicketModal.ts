import {
    TextInputBuilder,
    TextInputStyle,
    ActionRowBuilder,
    ModalBuilder
} from "discord.js";
import { ModalsId } from "../../Enums";

const ReasonInput = new TextInputBuilder()
    .setCustomId(ModalsId.CreateTicketInput)
    .setLabel("Motivo:")
    .setPlaceholder("Escribe el motivo de tu ticket")
    .setStyle(TextInputStyle.Short);

const FirstInput = new ActionRowBuilder<TextInputBuilder>().addComponents(ReasonInput);

export const CreateTicketModal = new ModalBuilder()
    .setCustomId(ModalsId.CreateTicket)
    .setTitle("¿Cuál es el motivo de tu ticket?")
    .addComponents(FirstInput);
