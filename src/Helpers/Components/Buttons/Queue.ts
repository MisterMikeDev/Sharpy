import { ButtonBuilder, ButtonStyle } from "discord.js";
import { Emojis } from "../../../Data/Emojis";
import { ButtonsId } from "../../Enums";

const ExitQueueButton = new ButtonBuilder()
    .setCustomId(ButtonsId.ExitQueue)
    .setEmoji(Emojis.Util.Deny)
    .setLabel("Exit")
    .setStyle(ButtonStyle.Danger);

const JoinQueueButton = new ButtonBuilder()
    .setCustomId(ButtonsId.JoinQueue)
    .setEmoji(Emojis.Util.Stage)
    .setLabel("Join")
    .setStyle(ButtonStyle.Success);

const FinishQueueButton = new ButtonBuilder()
    .setCustomId(ButtonsId.FinishQueue)
    .setEmoji("⏭️")
    .setLabel("Finish")
    .setStyle(ButtonStyle.Secondary);

const FocusQueueButton = new ButtonBuilder()
    .setCustomId(ButtonsId.FocusQueue)
    .setEmoji("🔍")
    .setLabel("Focus")
    .setStyle(ButtonStyle.Secondary);

const UnfocusQueueButton = new ButtonBuilder()
    .setCustomId(ButtonsId.FocusQueue)
    .setEmoji("🔍")
    .setLabel("Unfocus")
    .setStyle(ButtonStyle.Danger);

const SkipQueueButton = new ButtonBuilder()
    .setCustomId(ButtonsId.SkipQueue)
    .setEmoji("⏩")
    .setLabel("Vote Skip")
    .setStyle(ButtonStyle.Primary);

export {
    ExitQueueButton,
    FinishQueueButton,
    JoinQueueButton,
    FocusQueueButton,
    UnfocusQueueButton,
    SkipQueueButton
};
