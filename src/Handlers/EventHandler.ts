import { readdirSync } from "fs";
import { join } from "path";
import { Sharpy } from "../Client";
import { Event } from "../Interfaces";
import { ClientEvents } from "discord.js";
export const EventHandler = (Sharpy: Sharpy): void => {
    const Path = join(__dirname, "..", "Events", "Events");
    readdirSync(Path).map(async (File) => {
        const { event } = await import(`${Path}/${File}`);
        const { name, run }: Event = event;
        Sharpy.on(name as keyof ClientEvents, (...args) => run(Sharpy, ...args));
        return event;
    });
};
