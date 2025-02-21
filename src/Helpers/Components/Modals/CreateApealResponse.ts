import {
    TextInputBuilder,
    TextInputStyle,
    ActionRowBuilder,
    ModalBuilder
} from "discord.js";
import { ModalsId } from "../../Enums";

const PardonInput = new TextInputBuilder()
    .setCustomId(ModalsId.ApealCreatePardonReason)
    .setLabel("Razón del perdón:")
    .setPlaceholder("Explica el porque del perdón.")
    .setMinLength(10)
    .setMaxLength(1000)
    .setStyle(TextInputStyle.Paragraph);

const BanInput = new TextInputBuilder()
    .setCustomId(ModalsId.ApealCreateBanReason)
    .setLabel("Razón del ban:")
    .setPlaceholder("Explica el porque del ban.")
    .setMinLength(10)
    .setMaxLength(1000)
    .setStyle(TextInputStyle.Paragraph);

const ApealCreatePardonUserId = new TextInputBuilder()
    .setCustomId(ModalsId.ApealCreatePardonUserId)
    .setLabel("ID del usuario:")
    .setPlaceholder("ID del usuario a perdonar.")
    .setMinLength(18)
    .setMaxLength(20);

const ApealCreateBanUserId = new TextInputBuilder()
    .setCustomId(ModalsId.ApealCreateBanUserId)
    .setLabel("ID del usuario:")
    .setPlaceholder("ID del usuario a banear.")
    .setMinLength(18)
    .setMaxLength(20);

const VerifyIdInput = new TextInputBuilder()
    .setCustomId(ModalsId.ApealVerify)
    .setLabel("Verificar ID de la apelación:")
    .setPlaceholder("ID de la apelación.")
    .setMinLength(10)
    .setMaxLength(30)
    .setStyle(TextInputStyle.Short);

export const PardonModal = new ModalBuilder()
    .setCustomId(ModalsId.ApealCreatePardon)
    .setTitle("¿Se le perdona?")
    .addComponents(
        new ActionRowBuilder<TextInputBuilder>().addComponents(VerifyIdInput),
        new ActionRowBuilder<TextInputBuilder>().addComponents(ApealCreatePardonUserId),
        new ActionRowBuilder<TextInputBuilder>().addComponents(PardonInput)
    );

export const BanModal = new ModalBuilder()
    .setCustomId(ModalsId.ApealCreateBan)
    .setTitle("¿Se le banea?")
    .addComponents(
        new ActionRowBuilder<TextInputBuilder>().addComponents(VerifyIdInput),
        new ActionRowBuilder<TextInputBuilder>().addComponents(ApealCreateBanUserId),
        new ActionRowBuilder<TextInputBuilder>().addComponents(BanInput)
    );
