import { User } from "discord.js";

export interface Queue {
    id: string;
    messageID?: string;
    list: User[];
    focus: boolean;
    skipVoteList: {
        user: User;
        weight: number;
    }[];
}
