import { ActionRowBuilder, ButtonBuilder, EmbedBuilder } from "discord.js";
import { Queue } from "../../../Interfaces";
import { Sharpy } from "../../../Client";
import {
    FinishQueueButton,
    ExitQueueButton,
    JoinQueueButton,
    RestartQueueButton,
    SkipQueueButton
} from "../Buttons";

export const QueueEmbed = (Sharpy: Sharpy, queue: Queue) => {
    const { list } = queue;
    let content = "";
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

    const components = [
        new ActionRowBuilder<ButtonBuilder>().addComponents([
            JoinQueueButton,
            ExitQueueButton,
            FinishQueueButton
        ]) as ActionRowBuilder<ButtonBuilder>,
        new ActionRowBuilder<ButtonBuilder>().addComponents([
            SkipQueueButton,
            RestartQueueButton
        ]) as ActionRowBuilder<ButtonBuilder>
    ] as any;

    return {
        content,
        embed,
        components
    };
};
