/* eslint-disable no-unused-vars */
import { ButtonsId } from "../../Helpers";
import { Sharpy } from "../../Client";
import { CacheType, ButtonInteraction } from "discord.js";

interface Run {
    (Sharpy: Sharpy, interaction: ButtonInteraction<CacheType>, ...args: any[]);
}

export interface ButtonEvent {
    id: ButtonsId;
    run: Run;
}
