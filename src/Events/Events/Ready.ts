import { ChannelType, TextChannel } from "discord.js";
import { ColorText } from "../../Helpers";
import { Config } from "../../Data/Config";
import { Db as ReplicDb } from "../../Helpers/Db/Replic";
import { Db as BirthdayDb } from "../../Helpers/Db/Birthday";
import { Event } from "../../Interfaces";
import { Sharpy } from "../../Client";
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
        setInterval(() => CheckBirthdays(Sharpy), 43200000);
    }
};

function SetRandomStatus(Sharpy: Sharpy) {
    const { Status } = Config.DiscordBot;
    const arrayStatus = Status;

    Sharpy.user!.setPresence({
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
    const AllReplics = await ReplicDb.GetReplics(Sharpy);

    AllReplics.forEach(async (replic) => {
        if (replic.participants.filter((p) => p).length === 0) {
            await ReplicDb.RemoveReplicById(Sharpy, replic.id);
        }
    });
}

function AddAllUsersInVoiceToClientData(Sharpy: Sharpy) {
    Sharpy.guilds.cache.forEach(async (guild) => {
        guild.channels.cache.forEach(async (channel) => {
            if (channel.type === ChannelType.GuildVoice) {
                channel.members.forEach(async (member) => {
                    await Sharpy.AddUserToVoiceChannel(member.id, channel.id);
                });
            }
        });
    });
}

async function CheckBirthdays(Sharpy: Sharpy) {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth();

    const birthdays = await BirthdayDb.GetBirthdays(Sharpy);

    const todaysBirthdays = birthdays.filter((b) => {
        const bDate = b.date;
        return bDate.getDate() === day && bDate.getMonth() === month;
    });

    if (todaysBirthdays.length === 0) return;

    const birthdayChannel = (await Sharpy.channels.fetch(
        Config.DiscordBot.EchoesOfTalent.channels.Birthdays
    )) as TextChannel;

    const formatter = new Intl.ListFormat("es", { style: "long", type: "conjunction" });
    const mentions = formatter.format(todaysBirthdays.map((b) => `<@${b.userId}>`));

    if (birthdayChannel) {
        await birthdayChannel.send({
            content: `🎉 ¡Feliz cumpleaños a ${mentions}! 🎂🎈`
        });
    }

    todaysBirthdays.forEach(async (b) => {
        try {
            const user = await Sharpy.users.fetch(b.userId);
            await user.send({
                content: `🎂 ¡Feliz cumpleaños, ${user.globalName || user.username}! 🎉\n¡De parte del equipo de Echoes Of Talent esperamos que tengas un gran dia!`
            });
        } catch (error) {
            console.error(`No se pudo enviar el DM a ${b.userId}:`, error);
        }
    });
}
