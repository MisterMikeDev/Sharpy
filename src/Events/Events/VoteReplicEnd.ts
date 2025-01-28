import { Message, TextChannel } from "discord.js";
import { Event } from "../../Interfaces";
import { Db } from "../../Helpers/Db/Replic";

export const event: Event = {
    name: "voteReplicEnd",
    run: async (Sharpy, channelVote: TextChannel) => {
        const currentReplic = await Db.GetReplicByChannel(Sharpy, channelVote.id);

        if (!currentReplic) return;

        channelVote
            .send("La votación ha finalizado...")
            .then((msg: Message) => setTimeout(() => msg.delete().catch(() => {}), 2500));

        await Db.UpdateReplicStatus(Sharpy, {
            replicId: currentReplic.id,
            status: 3
        });

        await Sharpy.UpdateReplicInCurrentChannel(channelVote.id);

        await Db.RemoveReplicByChannel(Sharpy, channelVote.id);
    }
};
