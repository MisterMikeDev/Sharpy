import { Sharpy } from "../Client";
import { MenuEvent } from "../Interfaces";
import { join } from "path";
import { readdirSync } from "fs";
export const MenuEventHandler = (Sharpy: Sharpy) => {
    const Path = join(__dirname, "..", "Events", "MenuEvents");
    readdirSync(Path)
        .map(async (File) => {
            const { menuEvent } = await import(`${Path}/${File}`);
            const btnEvent: MenuEvent = menuEvent;
            return btnEvent;
        })
        .forEach(async (MenuEvent) => {
            const event = await MenuEvent;
            if (!event.id) return;
            Sharpy.menuevents.set(event.id, event);
        });
};
