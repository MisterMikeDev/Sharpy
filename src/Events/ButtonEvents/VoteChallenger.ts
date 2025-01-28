import { Emojis } from "../../Data/Emojis";
import { ButtonsId } from "../../Helpers";
import { ButtonEvent } from "../../Interfaces";

export const buttonEvent: ButtonEvent = {
    id: ButtonsId.VoteChallenger,
    run: async (Sharpy, interaction) => {
        await interaction.deferUpdate();

        const channel = interaction.message.channel;
        const user = interaction.user!;
        const currentDuel = Sharpy.duel.get(channel.id);

        if (!currentDuel)
            return await interaction
                .followUp({
                    content: `${Emojis.Util.No} | No hay un duelo en este canal.`,
                    ephemeral: true
                })
                .then((int) => setTimeout(() => int.delete().catch(() => {}), 5000));

        const challenger = currentDuel.challenger!;
        const rival = currentDuel.rival!;

        if (challenger.id === user.id || rival.id === user.id)
            return await interaction
                .followUp({
                    content: `${Emojis.Util.No} | Los participantes del duelo no pueden votar.`,
                    ephemeral: true
                })
                .then((int) => setTimeout(() => int.delete().catch(() => {}), 5000));

        if (currentDuel.votes.some((vote) => vote.user.id === user.id))
            await Sharpy.RemoveVoteFromDuel(channel.id, user);

        await Sharpy.AddVoteToDuel(channel.id, user, 1);

        await Sharpy.UpdateDuelInCurrentChannel(channel.id);
    }
};
