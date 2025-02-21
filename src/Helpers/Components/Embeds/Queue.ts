import { ActionRowBuilder, ButtonBuilder, EmbedBuilder } from "discord.js";
import { Queue } from "../../../Interfaces";
import { Sharpy } from "../../../Client";
import {
    FinishQueueButton,
    ExitQueueButton,
    JoinQueueButton,
    FocusQueueButton,
    UnfocusQueueButton,
    SkipQueueButton
} from "../Buttons";

export const QueueEmbed = (Sharpy: Sharpy, queue: Queue) => {
    const { list, focus } = queue;
    let content = "";
    const components = [] as any[];
    let currentTurn = "";
    let ListString = "";

    if (list.length === 0) {
        content = "La lista está vacía.";
        currentTurn = "Nadie";
        ListString = "La lista está vacía.";
    } else {
        content = `Es el turno de <@${list[0].id}>`;
        currentTurn = `<@${list[0].id}>`;
        ListString = list
            .map((user, index) => {
                const userMention = `<@${user.id}>`;
                if (index === 0) return `\`${index + 1}.\` ${userMention} :red_circle:`;
                return `\`${index + 1}.\` ${userMention}`;
            })
            .join("\n");
    }

    const embed = new EmbedBuilder()
        .setTitle("Lista de Karaoke")
        .setDescription(ListString)
        .setColor("#600604")
        .setFields(
            {
                name: "Turno Actual",
                value: currentTurn,
                inline: true
            },
            {
                name: "En la lista",
                value: `\`${list.length}\` persona${list.length === 1 ? "" : "s"}`,
                inline: true
            }
        )
        .setFooter({
            iconURL: Sharpy.user?.displayAvatarURL(),
            text: "Usa los botones para unirte a la lista"
        });

    if (list.length > 0) {
        const commonButtons = [JoinQueueButton, ExitQueueButton, FinishQueueButton];
        const focusButtons = focus ? UnfocusQueueButton : FocusQueueButton;

        components.push(
            new ActionRowBuilder<ButtonBuilder>().addComponents(commonButtons)
        );

        components.push(
            new ActionRowBuilder<ButtonBuilder>().addComponents([
                SkipQueueButton,
                focusButtons
            ])
        );
    } else {
        components.push(
            new ActionRowBuilder<ButtonBuilder>().addComponents([JoinQueueButton])
        );
    }

    return {
        content,
        embed,
        components
    };
};
