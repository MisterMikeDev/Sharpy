import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    EmbedBuilder,
    User
} from "discord.js";
import { Sharpy } from "../../../Client";
import { EmojisIds } from "../../../Data/Emojis";
import { ButtonsId } from "../../Enums";
import { Db } from "../../Db/Suggest";

export const SuggestionEmbed = async (Sharpy: Sharpy, suggestId: string) => {
    const suggest = await Db.GetSuggestionById(Sharpy, suggestId);

    if (!suggest) {
        throw new Error("Sugerecia no encontrada");
    }

    const user = (await Sharpy.users.fetch(suggest.authorId)) as User;
    const suggestion = suggest.suggestion;

    const votes = suggest.votes;
    const positiveVotes = votes.filter((vote) => vote.vote === 1).length;
    const negativeVotes = votes.filter((vote) => vote.vote === 0).length;

    const description = `**Sugerencia del usuario <@${user.id}>**\n\`\`\`${suggestion}\`\`\``;

    const embed = new EmbedBuilder()
        .setTitle("Sugerencia")
        .setDescription(description)
        .setColor("#550000")
        .setFooter({
            text: `Sugerencia de ${Sharpy.user?.tag}`,
            iconURL: Sharpy.user?.displayAvatarURL()
        })
        .setTimestamp();

    const components = [
        new ActionRowBuilder<ButtonBuilder>().addComponents([
            ApproveButton(positiveVotes),
            RejectButton(negativeVotes)
        ]) as ActionRowBuilder<ButtonBuilder>
    ] as any;

    return {
        embed,
        components
    };
};

const ApproveButton = (votes: number) =>
    new ButtonBuilder()
        .setLabel(`Aprobar (${votes})`)
        .setCustomId(ButtonsId.SuggestionApprove)
        .setStyle(ButtonStyle.Success)
        .setEmoji(EmojisIds.Util.Yes);

const RejectButton = (votes: number) =>
    new ButtonBuilder()
        .setLabel(`Rechazar (${votes})`)
        .setCustomId(ButtonsId.SuggestionReject)
        .setStyle(ButtonStyle.Danger)
        .setEmoji(EmojisIds.Util.No);
