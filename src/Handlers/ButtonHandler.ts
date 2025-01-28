import { Sharpy } from "../Client";
import { ButtonEvent } from "../Interfaces";
import { join } from "path";
import { readdirSync } from "fs";
export const ButtonEventHandler = (Sharpy: Sharpy) => {
    const Path = join(__dirname, "..", "Events", "ButtonEvents");
    readdirSync(Path)
        .map(async (File) => {
            const { buttonEvent } = await import(`${Path}/${File}`);
            const btnEvent: ButtonEvent = buttonEvent;
            return btnEvent;
        })
        .forEach(async (ButtonEvent) => {
            const event = await ButtonEvent;
            if (!event.id) return;
            Sharpy.buttonevents.set(event.id, event);
        });
};
