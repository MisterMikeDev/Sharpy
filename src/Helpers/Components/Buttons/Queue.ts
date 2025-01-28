import { ButtonBuilder, ButtonStyle } from "discord.js";
import { Emojis } from "../../../Data/Emojis";
import { ButtonsId } from "../../Enums";

const ExitQueueButton = new ButtonBuilder()
    .setCustomId(ButtonsId.ExitQueue)
    .setEmoji(Emojis.Music.Stop)
    .setLabel("Exit")
    .setStyle(ButtonStyle.Danger);

const JoinQueueButton = new ButtonBuilder()
    .setCustomId(ButtonsId.JoinQueue)
    .setEmoji(Emojis.Music.Join)
    .setLabel("Join")
    .setStyle(ButtonStyle.Success);

const FinishQueueButton = new ButtonBuilder()
    .setCustomId(ButtonsId.FinishQueue)
    .setEmoji(Emojis.Music.Pause)
    .setLabel("Finish")
    .setStyle(ButtonStyle.Secondary);

const RestartQueueButton = new ButtonBuilder()
    .setCustomId(ButtonsId.RestartQueue)
    .setEmoji(Emojis.Music.LoopQueue)
    .setLabel("Restart")
    .setStyle(ButtonStyle.Secondary);

const SkipQueueButton = new ButtonBuilder()
    .setCustomId(ButtonsId.SkipQueue)
    .setEmoji(Emojis.Music.Next)
    .setLabel("Vote Skip")
    .setStyle(ButtonStyle.Primary);

export {
    ExitQueueButton,
    FinishQueueButton,
    JoinQueueButton,
    RestartQueueButton,
    SkipQueueButton
};
