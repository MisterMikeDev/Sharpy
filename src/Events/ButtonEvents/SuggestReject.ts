import { Config } from "../../Data/Config";
import { Emojis } from "../../Data/Emojis";
import { ButtonsId } from "../../Helpers";
import { Db } from "../../Helpers/Db/Suggest";
import { ButtonEvent } from "../../Interfaces";

export const buttonEvent: ButtonEvent = {
    id: ButtonsId.SuggestionReject,
    run: async (Sharpy, interaction) => {
        await interaction.deferReply({ ephemeral: true });
        const interactionChannel = interaction.channel!;
        const messageId = interaction.message.id!;

        if (
            interactionChannel.id !== Config.DiscordBot.EchosOfTalent.channels.Sugerencias
        )
            return await interaction.followUp({
                content: `${Emojis.Util.No} | No puedes usar este botón en este canal`
            });

        const suggestion = await Db.GetSuggestionByMessageId(Sharpy, messageId);

        if (!suggestion)
            return await interaction.followUp({
                content: `${Emojis.Util.No} | No se ha encontrado la sugerencia`
            });

        const userVote = suggestion.votes.find(
            (vote) => vote.userId === interaction.user.id
        );

        if (userVote && userVote.vote === 0)
            return await interaction.followUp({
                content: `${Emojis.Util.No} | Ya has votado negativamente.`
            });

        await Db.VoteSuggestion(Sharpy, {
            suggestionId: suggestion.id,
            userId: interaction.user.id,
            vote: 0
        });

        await Sharpy.UpdateVotesSuggestMessage(suggestion.id);

        await interaction.followUp({
            content: "👎 | Voto negativo registrado."
        });
    }
};
