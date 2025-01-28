/* eslint-disable no-unused-vars */
import { Sharpy } from "../../Client";
import { CacheType, StringSelectMenuInteraction } from "discord.js";
import { MenuId } from "../../Helpers/Enums";

interface Run {
    (Sharpy: Sharpy, interaction: StringSelectMenuInteraction<CacheType>, ...args: any[]);
}

export interface MenuEvent {
    id: MenuId;
    run: Run;
}
