import { Message, TextChannel } from "discord.js";
import { Event } from "../../Interfaces";
import { Emojis } from "../../Data/Emojis";
import { TurnType } from "../../Interfaces/Other/Duel";

export const event: Event = {
    name: "voteDuelEnd",
    run: async (Sharpy, channelVote: TextChannel) => {
        const currentDuel = Sharpy.duel.get(channelVote.id);

        if (!currentDuel) return;

        channelVote
            .send(`${Emojis.Util.Loading} La votación ha finalizado...`)
            .then((msg: Message) => setTimeout(() => msg.delete().catch(() => {}), 2500));

        const modifiedDuelToEnd = {
            ...currentDuel,
            currentTurn: 5 as TurnType
        };

        await Sharpy.ModifyDuel(channelVote.id, modifiedDuelToEnd);

        await Sharpy.UpdateDuelInCurrentChannel(channelVote.id);

        Sharpy.duel.delete(channelVote.id);
    }
};
