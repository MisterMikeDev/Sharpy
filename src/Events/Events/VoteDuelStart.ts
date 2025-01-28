import { TextChannel } from "discord.js";
import { Event } from "../../Interfaces";
import { sleep } from "../../Helpers";

export const event: Event = {
    name: "voteDuelStart",
    run: async (Sharpy, channelVote: TextChannel) => {
        sleep(60000).then(() => Sharpy.emit("voteDuelEnd", channelVote));
    }
};
