import {
    TextInputBuilder,
    TextInputStyle,
    ActionRowBuilder,
    ModalBuilder
} from "discord.js";
import { ModalsId } from "../../Enums";

const UserReasonInput = new TextInputBuilder()
    .setCustomId(ModalsId.UserCloseTicketInput)
    .setLabel("Motivo:")
    .setPlaceholder("Escribe el motivo de cierre del ticket.")
    .setStyle(TextInputStyle.Short);

const UserFirstInput = new ActionRowBuilder<TextInputBuilder>().addComponents(
    UserReasonInput
);

export const UserCloseTicketModal = new ModalBuilder()
    .setCustomId(ModalsId.UserCloseTicket)
    .setTitle("¿Cuál es el motivo de cierre del ticket?")
    .addComponents(UserFirstInput);

const StaffReasonInput = new TextInputBuilder()
    .setCustomId(ModalsId.StaffCloseTicketInput)
    .setLabel("Motivo:")
    .setPlaceholder("Escribe el motivo de cierre del ticket.")
    .setRequired(false)
    .setStyle(TextInputStyle.Short);

const StaffFirstInput = new ActionRowBuilder<TextInputBuilder>().addComponents(
    StaffReasonInput
);

export const StaffCloseTicketModal = new ModalBuilder()
    .setCustomId(ModalsId.StaffCloseTicket)
    .setTitle("¿Cuál es el motivo de cierre del ticket?")
    .addComponents(StaffFirstInput);
