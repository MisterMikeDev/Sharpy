import { Client, Collection, EmbedBuilder, Message, TextChannel, User } from "discord.js";
import { PrismaClient } from "@prisma/client";
import { Config } from "../Data/Config";
import {
    ButtonEvent,
    CommandType,
    Duel,
    MenuEvent,
    ModalEvent,
    Queue,
    UserVoiceChannel
} from "../Interfaces";
import {
    EventHandler,
    SlashCommandsHandler,
    ButtonEventHandler,
    MenuEventHandler,
    ModalEventHandler
} from "../Handlers";
import {
    QueueEmbed,
    DuelEmbed,
    GetCountOfBoostThisServer,
    TicketsCreatedEmbed,
    SuggestionEmbed,
    ReplicEmbed
} from "../Helpers";
import { Db as TicketDb } from "../Helpers/Db/Tickets";
import { Db as SuggestDb } from "../Helpers/Db/Suggest";
import { Db as ReplicDb } from "../Helpers/Db/Replic";
import { Db as LevelSystemDb } from "../Helpers/Db/LevelSystem";

const { DiscordBot } = Config;

const db = new PrismaClient();

export class Sharpy extends Client {
    public slashcommands: Collection<string, CommandType> = new Collection();
    public buttonevents: Collection<string, ButtonEvent> = new Collection();
    public menuevents: Collection<string, MenuEvent> = new Collection();
    public modalevents: Collection<string, ModalEvent> = new Collection();
    public queue: Collection<string, Queue> = new Collection();
    public duel: Collection<string, Duel> = new Collection();
    public userVoiceChannel: Set<UserVoiceChannel> = new Set();
    public db: PrismaClient = db;
    public isOnline = false;

    constructor() {
        super({
            intents: DiscordBot.Intents,
            allowedMentions: {
                repliedUser: false
            }
        });
    }

    public async start() {
        await this.login(DiscordBot.Token).then(() => {
            this.isOnline = true;
        });

        EventHandler(this);
        ButtonEventHandler(this);
        MenuEventHandler(this);
        ModalEventHandler(this);
        SlashCommandsHandler(this);

        process.on("unhandledRejection", console.error);
        return this;
    }

    /* Metodos para la queue */
    public async CreateQueue(id: string, messageID: string, list: User[]) {
        const newQueue: Queue = {
            id: id,
            messageID: messageID,
            list: list,
            skipVoteList: []
        };

        this.queue.set(id, newQueue);
    }

    public async ModifyQueue(id: string, list: User[]) {
        const currentQueue = this.queue.get(id) as Queue;

        const modifyQueue = {
            ...currentQueue,
            list: list
        } as Queue;

        this.queue.set(id, modifyQueue);
    }

    public async DeleteQueue(id: string) {
        this.queue.delete(id);
    }

    public async ChangeMessageId(id: string, newMessageId: string) {
        const currentQueue = this.queue.get(id) as Queue;

        const modifyQueue = {
            ...currentQueue,
            messageID: newMessageId
        } as Queue;

        this.queue.set(id, modifyQueue);
    }

    public async AddUserToSkipVoteList(id: string, user: User) {
        const currentQueue = this.queue.get(id) as Queue;

        const guildMember = await this.guilds.cache
            .get("1307747744768856110")!
            .members.fetch(user.id);

        const weight = GetCountOfBoostThisServer(guildMember) >= 2 ? 2 : 1;

        const modifyQueue = {
            ...currentQueue,
            skipVoteList: [...currentQueue.skipVoteList, { user, weight }]
        } as Queue;

        this.queue.set(id, modifyQueue);
    }

    public async RemoveUserToSkipVoteList(id: string, userId: string) {
        const currentQueue = this.queue.get(id) as Queue;

        const modifyQueue = {
            ...currentQueue,
            skipVoteList: currentQueue.skipVoteList.filter((v) => v.user.id !== userId)
        } as Queue;

        this.queue.set(id, modifyQueue);
    }

    public async ClearSkipVoteList(id: string) {
        const currentQueue = this.queue.get(id) as Queue;

        const modifyQueue = {
            ...currentQueue,
            skipVoteList: []
        } as Queue;

        this.queue.set(id, modifyQueue);
    }

    public async UpdateQueueInCurrentChannel(id: string) {
        const currentQueue = this.queue.get(id) as Queue;

        const { content, embed } = QueueEmbed(this, currentQueue);

        const channel = (await this.channels.fetch(id)) as TextChannel;
        const messages = await channel!.messages.fetch();
        const queueMessage = messages.find(
            (msg: Message) => msg.id === currentQueue.messageID
        );

        if (!queueMessage) {
            return;
        }

        await queueMessage.edit({
            content,
            embeds: [embed]
        });
    }

    /* Metodos para el duelo */
    public async CreateDuel(
        id: string,
        messageID: string,
        challenger: User,
        rival: User
    ) {
        const newDuel: Duel = {
            id: id,
            messageID: messageID,
            challenger: challenger,
            rival: rival,
            currentTurn: 0,
            votes: []
        };

        this.duel.set(id, newDuel);

        return newDuel;
    }

    public async ModifyDuel(id: string, duel: Duel) {
        this.duel.set(id, duel);
    }

    public async DeleteDuel(id: string) {
        this.duel.delete(id);
    }

    public async ChangeDuelMessageId(id: string, newMessageId: string) {
        const currentDuel = this.duel.get(id) as Duel;

        const modifyDuel = {
            ...currentDuel,
            messageID: newMessageId
        } as Duel;

        this.duel.set(id, modifyDuel);
    }

    public async AddVoteToDuel(id: string, user: User, vote: 0 | 1 | 2) {
        const currentDuel = this.duel.get(id) as Duel;

        const guildMember = await this.guilds.cache
            .get("1307747744768856110")!
            .members.fetch(user.id);

        const weight = GetCountOfBoostThisServer(guildMember) >= 2 ? 2 : 1;

        const modifyDuel = {
            ...currentDuel,
            votes: [...currentDuel.votes]
        } as Duel;

        modifyDuel.votes.push({ user, vote, weight });

        this.duel.set(id, modifyDuel);
    }

    public async RemoveVoteFromDuel(id: string, user: User) {
        const currentDuel = this.duel.get(id) as Duel;

        const modifyDuel = {
            ...currentDuel,
            votes: currentDuel.votes.filter((v) => v.user.id !== user.id)
        } as Duel;

        this.duel.set(id, modifyDuel);
    }

    public async UpdateDuelInCurrentChannel(id: string) {
        const currentDuel = this.duel.get(id) as Duel;

        const channel = (await this.channels.fetch(id)) as TextChannel;
        const messages = await channel!.messages.fetch();
        const duelMessage = messages.find(
            (msg: Message) => msg.id === currentDuel.messageID
        );

        if (!duelMessage) {
            return;
        }

        const { content, embed, components } = await DuelEmbed(this, currentDuel);

        await duelMessage
            .edit({
                content: content,
                embeds: [embed],
                components
            })
            .catch(() => {});
    }

    public async SetDuelWinner(duel: Duel) {
        let challengerVotes = 0;
        let rivalVotes = 0;

        let modifiedDuel: Duel;

        duel.votes.forEach((v) => {
            if (v.vote === 1) challengerVotes += v.weight;
            if (v.vote === 2) rivalVotes += v.weight;
        });

        if (challengerVotes === rivalVotes) {
            modifiedDuel = {
                ...duel,
                winner: undefined
            };
        } else {
            const winner = challengerVotes > rivalVotes ? duel.challenger : duel.rival;

            modifiedDuel = {
                ...duel,
                winner: winner!
            };
        }

        this.duel.set(duel.id, modifiedDuel);

        return modifiedDuel;
    }

    public async DeclineDuel(duel: Duel) {
        if (!duel) return;
        const messageId = duel.messageID;

        const channel = (await this.channels.fetch(duel.id)) as TextChannel;
        const messages = await channel!.messages.fetch();
        const duelMessage = messages.find((msg: Message) => msg.id === messageId);

        if (!duelMessage) {
            return;
        }

        await duelMessage
            .edit({
                content: "",
                embeds: [
                    new EmbedBuilder()
                        .setTitle("Duelo declinado")
                        .setDescription(`<@${duel.rival!.id}> ha declinado el duelo.`)
                        .setColor("#ff0000")
                        .setFooter({
                            text: "Duelo",
                            iconURL: this.user!.displayAvatarURL()!
                        })
                ],
                components: []
            })
            .catch(() => {});

        this.duel.delete(duel.id);
    }

    /* Metodos para los tickets */
    public async UpdateTicketInCurrentChannel(channelId: string) {
        const ticket = await TicketDb.GetTicketByChannelId(this, channelId);

        if (!ticket) {
            return;
        }

        const channel = (await this.channels.fetch(channelId)) as TextChannel;
        const messages = await channel!.messages.fetch();
        const ticketMessage = messages.find(
            (msg: Message) => msg.id === ticket.messageId
        );

        if (!ticketMessage) {
            return;
        }

        const { content, embed, components } = await TicketsCreatedEmbed(this, ticket.id);

        await ticketMessage.edit({
            content,
            embeds: [embed],
            components
        });
    }

    /* Metodos para actualizar el contador de votos en las sugerencias */
    public async UpdateVotesSuggestMessage(suggestionId: string) {
        const suggestion = await SuggestDb.GetSuggestionById(this, suggestionId);

        if (!suggestion) {
            return;
        }

        const channel = (await this.channels.fetch(
            Config.DiscordBot.EchosOfTalent.channels.Sugerencias
        )) as TextChannel;
        const messages = await channel!.messages.fetch();
        const suggestionMessage = messages.find(
            (msg: Message) => msg.id === suggestion.messageId
        );

        if (!suggestionMessage) {
            return;
        }

        const { embed, components } = await SuggestionEmbed(this, suggestion.id);

        await suggestionMessage.edit({
            embeds: [embed],
            components
        });
    }

    /* Metodos para actualizar el mensaje de una replica */
    public async UpdateReplicInCurrentChannel(channelId: string) {
        const replic = await ReplicDb.GetReplicByChannel(this, channelId);

        if (!replic) {
            return;
        }

        const channel = (await this.channels.fetch(channelId)) as TextChannel;
        const messages = await channel!.messages.fetch();
        const replicMessage = messages.find(
            (msg: Message) => msg.id === replic.messageId
        );

        if (!replicMessage) {
            return;
        }

        const { content, embed, components } = await ReplicEmbed(this, replic.id);

        await replicMessage.edit({
            content,
            embeds: [embed],
            components
        });
    }

    /* Metodos para la medicion de tiempos en VoiceChat */
    public async GetUserVoiceChannel(userId: string) {
        return Array.from(this.userVoiceChannel).find((user) => user.id === userId);
    }

    public async AddUserToVoiceChannel(userId: string, channelId: string) {
        const userVoiceChannel = {
            id: userId,
            channelId,
            onJoinDate: new Date().getTime()
        } as UserVoiceChannel;

        this.userVoiceChannel.add(userVoiceChannel);
    }

    public async RemoveUserFromVoiceChannel(userId: string) {
        this.userVoiceChannel.delete(
            Array.from(this.userVoiceChannel).find((user) => user.id === userId)!
        );
    }

    public async GetTimeInVoiceChannelAndRemoveUser(userId: string) {
        const user = Array.from(this.userVoiceChannel).find((user) => user.id === userId);

        if (!user) {
            return 0;
        }

        const time = new Date().getTime() - user.onJoinDate;

        this.userVoiceChannel.delete(user);

        return time;
    }

    public async AddVoiceXpToUser(userId: string, xp: number) {
        const xpUser = await LevelSystemDb.GetUserByUserId(this, userId);

        if (!xpUser) await LevelSystemDb.CreateUser(this, userId);

        const { leveledUp, message: levelUpMessage } = await LevelSystemDb.AddXpToUser(
            this,
            userId,
            xp
        );

        if (leveledUp && levelUpMessage) {
            const channel = (await this.channels.fetch(
                Config.DiscordBot.EchosOfTalent.channels.Niveles
            )) as TextChannel;

            if (!channel) return;

            const user = await this.users.fetch(userId);

            channel.send({
                content: `<@${userId}>`,
                embeds: [
                    new EmbedBuilder()
                        .setTitle("🎉 ¡Nivel alcanzado! 🎉")
                        .setDescription(`🎉 ${levelUpMessage} 🎉`)
                        .setColor("#e9c430")
                        .setFooter({
                            text: "Echoes of Talent | Subida de nivel en VoiceChat",
                            iconURL: user.displayAvatarURL()
                        })
                        .setTimestamp()
                ],
                allowedMentions: { parse: ["users"] }
            });
        }
    }
}
