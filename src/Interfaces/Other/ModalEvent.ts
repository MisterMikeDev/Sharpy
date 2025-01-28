/* eslint-disable no-unused-vars */
import { ModalsId } from "../../Helpers";
import { Sharpy } from "../../Client";
import { CacheType, ModalSubmitInteraction } from "discord.js";

interface Run {
    (Sharpy: Sharpy, interaction: ModalSubmitInteraction<CacheType>, ...args: any[]);
}

export interface ModalEvent {
    id: ModalsId;
    run: Run;
}
