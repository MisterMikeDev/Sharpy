import { Sharpy } from "../../Client";
import { Emojis } from "../../Data/Emojis";
import { ClampNumbers } from "./index";

const {
    Ping1: AppallingPing,
    Ping2: BadPing,
    Ping3: RegularPing,
    Ping4: GoodPing,
    Ping5: AwesomePing
} = Emojis.Ping;

export const getColorByPing = (ping: number) => {
    const fixedPing = ClampNumbers(ping);
    if (fixedPing >= 0 && fixedPing <= 60) return "#2BFF00";
    if (fixedPing >= 61 && fixedPing <= 100) return "#FFF300";
    if (fixedPing >= 101 && fixedPing <= 150) return "#FF9B00";
    if (fixedPing >= 151 && fixedPing <= 200) return "#FF0000";
    if (fixedPing >= 201) return "#930000";
    return "#000000";
};

export const getEmojiByPing = (ping: number) => {
    const fixedPing = ClampNumbers(ping);
    if (fixedPing >= 0 && fixedPing <= 60) return AwesomePing;
    if (fixedPing >= 61 && fixedPing <= 100) return GoodPing;
    if (fixedPing >= 101 && fixedPing <= 150) return RegularPing;
    if (fixedPing >= 151 && fixedPing <= 200) return BadPing;
    if (fixedPing >= 201) return AppallingPing;
    return AppallingPing;
};

export const getLocalResponsePing = (interactionTimeStamp: number) => {
    const localPing = Date.now() - interactionTimeStamp;
    return {
        ping: ClampNumbers(localPing),
        emoji: getEmojiByPing(localPing),
        color: getColorByPing(localPing),
        message:
            localPing >= 0 && localPing <= 60
                ? "¡Ping de respuesta excelente!"
                : "¡Ping de respuesta malo!"
    };
};

export const getDiscordAPIPing = (Sharpy: Sharpy) => {
    const SharpyPing = Sharpy.ws.ping;
    return {
        ping: ClampNumbers(SharpyPing),
        emoji: getEmojiByPing(SharpyPing),
        color: getColorByPing(SharpyPing),
        message:
            SharpyPing >= 0 && SharpyPing <= 60
                ? "¡Ping de respuesta excelente!"
                : "¡Ping de respuesta malo!"
    };
};
