import { ColorResolvable, EmbedBuilder } from "discord.js";
import { Emojis } from "../../../Data/Emojis";

export const Tag = ({
    message,
    type = "normal"
}: {
    message: string;
    type?: "info" | "success" | "error" | "warning" | "normal";
}) => {
    const color = {
        info: "#7d22e6",
        success: "#1cd422",
        error: "#e8220e",
        warning: "#ffcd03",
        normal: "#95a5a6"
    };

    const emoji = {
        info: "❗",
        success: Emojis.Util.Allow,
        error: Emojis.Util.Deny,
        warning: "⚠️",
        normal: "📝"
    };

    const e = emoji[type] || emoji.normal;
    const c = (color[type] || color.normal) as ColorResolvable;
    const description = `${e} ${message}`;

    const embed = new EmbedBuilder().setDescription(description).setColor(c);

    return { embed };
};
