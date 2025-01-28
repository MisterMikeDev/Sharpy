import { ButtonBuilder, ButtonStyle } from "discord.js";
import { ButtonsId } from "../../Enums";
import { EmojisIds } from "../../../Data/Emojis";

export const JoinReplic = (active: boolean = true) =>
    new ButtonBuilder()
        .setCustomId(ButtonsId.JoinReplic)
        .setLabel("Unirse")
        .setDisabled(!active)
        .setEmoji(EmojisIds.Util.Allow)
        .setStyle(ButtonStyle.Success);

export const ExitReplic = (active: boolean = true) =>
    new ButtonBuilder()
        .setCustomId(ButtonsId.ExitReplic)
        .setLabel("Salir")
        .setDisabled(!active)
        .setEmoji(EmojisIds.Util.Deny)
        .setStyle(ButtonStyle.Danger);

export const StartReplic = (active: boolean = true) =>
    new ButtonBuilder()
        .setCustomId(ButtonsId.StartReplic)
        .setLabel("Iniciar")
        .setDisabled(!active)
        .setEmoji("🚀")
        .setStyle(ButtonStyle.Primary);

export const NextTurnReplic = (active: boolean = true) =>
    new ButtonBuilder()
        .setCustomId(ButtonsId.NextTurnReplic)
        .setLabel("Siguiente turno")
        .setDisabled(!active)
        .setEmoji("↪️")
        .setStyle(ButtonStyle.Primary);

export const VoteFirstParticipant = (active: boolean = true) =>
    new ButtonBuilder()
        .setCustomId(ButtonsId.VoteFirstParticipant)
        .setLabel("Participante 1")
        .setDisabled(!active)
        .setEmoji("🟥")
        .setStyle(ButtonStyle.Secondary);

export const VoteSecondParticipant = (active: boolean = true) =>
    new ButtonBuilder()
        .setCustomId(ButtonsId.VoteSecondParticipant)
        .setLabel("Participante 2")
        .setDisabled(!active)
        .setEmoji("🟦")
        .setStyle(ButtonStyle.Secondary);

export const VoteThirdParticipant = (active: boolean = true) =>
    new ButtonBuilder()
        .setCustomId(ButtonsId.VoteThirdParticipant)
        .setLabel("Participante 3")
        .setDisabled(!active)
        .setEmoji("🟩")
        .setStyle(ButtonStyle.Secondary);

export const VoteFourthParticipant = (active: boolean = true) =>
    new ButtonBuilder()
        .setCustomId(ButtonsId.VoteFourthParticipant)
        .setLabel("Participante 4")
        .setDisabled(!active)
        .setEmoji("🟨")
        .setStyle(ButtonStyle.Secondary);
