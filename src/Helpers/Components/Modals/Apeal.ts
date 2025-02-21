import {
    TextInputBuilder,
    TextInputStyle,
    ActionRowBuilder,
    ModalBuilder
} from "discord.js";
import { ModalsId } from "../../Enums";

const SituationInput = new TextInputBuilder()
    .setCustomId(ModalsId.ApealSituation)
    .setLabel("Situación:")
    .setPlaceholder("Explica la situación que deseas apelar.")
    .setMinLength(10)
    .setMaxLength(1000)
    .setStyle(TextInputStyle.Paragraph);

const CommitmentInput = new TextInputBuilder()
    .setCustomId(ModalsId.ApealCommitment)
    .setLabel("Compromiso:")
    .setPlaceholder("Explica el compromiso a futuro que deberás cumplir.")
    .setMinLength(10)
    .setMaxLength(1000)
    .setStyle(TextInputStyle.Paragraph);

export const ApealModal = new ModalBuilder()
    .setCustomId(ModalsId.ApealCreate)
    .setTitle("¿Cuál es la situación que deseas apelar?")
    .addComponents(
        new ActionRowBuilder<TextInputBuilder>().addComponents(SituationInput),
        new ActionRowBuilder<TextInputBuilder>().addComponents(CommitmentInput)
    );
