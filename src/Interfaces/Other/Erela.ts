/* eslint-disable no-unused-vars */
import { Sharpy } from "../../Client";

type ErelaJSEvents =
    | "nodeCreate"
    | "nodeDestroy"
    | "nodeConnect"
    | "nodeDisconnect"
    | "nodeError"
    | "nodeRaw"
    | "playerCreate"
    | "playerDestroy"
    | "queueEnd"
    | "playerMove"
    | "playerDisconnect"
    | "trackStart"
    | "trackEnd"
    | "trackStuck"
    | "trackError"
    | "socketClosed";

interface Run {
    (Sharpy: Sharpy, ...args: any[]);
}

export interface ErelaEvent {
    name: ErelaJSEvents;
    run: Run;
}
