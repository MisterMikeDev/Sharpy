import { ChannelType } from "discord.js";
import { Sharpy } from "../../Client";
import { Config } from "../../Data/Config";
import { ColorText } from "../../Helpers";
import { Db } from "../../Helpers/Db/Replic";
import { Event } from "../../Interfaces";
export const event: Event = {
    name: "ready",
    run: async (Sharpy) => {
        console.log(
            `[${ColorText("+", "greenBright")}] ${ColorText(
                `${Sharpy.user?.tag}`,
                "magentaBright"
            )} en linea ✅`
        );

        SetRandomStatus(Sharpy);
        AddAllUsersInVoiceToClientData(Sharpy);
        setInterval(() => SetRandomStatus(Sharpy), 10000);
        setInterval(() => RemoveEmptyQueues(Sharpy), 900000);
        setInterval(() => RemoveEmptyReplics(Sharpy), 900000);
    }
};

function SetRandomStatus(Sharpy: Sharpy) {
    const { Status } = Config.DiscordBot;
    const arrayStatus = Status;

    Sharpy.user?.setPresence({
        activities: [arrayStatus[Math.floor(Math.random() * arrayStatus.length)]],
        status: process.env.NODE_ENV === "production" ? "online" : "dnd"
    });
}

function RemoveEmptyQueues(Sharpy: Sharpy) {
    Sharpy.queue.forEach((queue, channelId) => {
        if (queue.list.length === 0) {
            Sharpy.queue.delete(channelId);
        }
    });
}

async function RemoveEmptyReplics(Sharpy: Sharpy) {
    const AllReplics = await Db.GetReplics(Sharpy);

    AllReplics.forEach(async (replic) => {
        if (replic.participants.filter((p) => p).length === 0) {
            await Db.RemoveReplicById(Sharpy, replic.id);
        }
    });
}

function AddAllUsersInVoiceToClientData(Sharpy: Sharpy) {
    Sharpy.guilds.cache.forEach(async (guild) => {
        guild.channels.cache.forEach(async (channel) => {
            if (channel.type === ChannelType.GuildVoice) {
                channel.members.forEach(async (member) => {
                    Sharpy.AddUserToVoiceChannel(member.id, channel.id);
                });
            }
        });
    });
}
