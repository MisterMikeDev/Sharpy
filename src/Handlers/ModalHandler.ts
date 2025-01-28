import { Sharpy } from "../Client";
import { ModalEvent } from "../Interfaces";
import { join } from "path";
import { readdirSync } from "fs";
export const ModalEventHandler = (Sharpy: Sharpy) => {
    const Path = join(__dirname, "..", "Events", "ModalEvents");
    readdirSync(Path)
        .map(async (File) => {
            const { modalEvent } = await import(`${Path}/${File}`);
            const mdlEvent: ModalEvent = modalEvent;
            return mdlEvent;
        })
        .forEach(async (ModalEvent) => {
            const event = await ModalEvent;
            if (!event.id) return;
            Sharpy.modalevents.set(event.id.toString(), event);
        });
};
