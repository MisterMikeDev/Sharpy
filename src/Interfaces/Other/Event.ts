/* eslint-disable no-unused-vars */
import { Sharpy } from "../../Client";
import { ClientEvents } from "discord.js";

interface Run {
    (Sharpy: Sharpy, ...args: any[]);
}

type EventName =
    | keyof ClientEvents
    | "voteDuelStart"
    | "voteDuelEnd"
    | "voteReplicStart"
    | "voteReplicEnd"
    | "closeTicket";

export interface Event {
    name: EventName;
    run: Run;
}
