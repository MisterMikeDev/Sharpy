import { TextChannel } from "discord.js";
import { Event } from "../../Interfaces";
import { sleep } from "../../Helpers";

export const event: Event = {
    name: "voteReplicStart",
    run: async (Sharpy, channelVote: TextChannel) => {
        sleep(120000).then(() => Sharpy.emit("voteReplicEnd", channelVote));
    }
};
