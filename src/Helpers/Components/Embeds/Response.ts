import { ColorResolvable, EmbedBuilder } from "discord.js";

export const ResponseEmbed = ({
    type,
    message,
    emoji,
    size
}: {
    type: "success" | "error" | "warning" | "info";
    message: string;
    emoji?: string;
    size?: "r" | "m" | "l" | "xl";
}) => {
    const colors = {
        success: "#00ff2a",
        error: "#ff0000",
        warning: "#ffcc00",
        info: "#5865f2"
    };

    const sizes = {
        r: "",
        m: "### ",
        l: "## ",
        xl: "# "
    };

    const color = (colors[type] || colors.info) as ColorResolvable;
    const prefix = emoji ? `${emoji} | ` : "";
    const sizePrefix = sizes[size || "r"] || sizes.r;

    return new EmbedBuilder()
        .setColor(color)
        .setDescription(`${sizePrefix}${prefix}${message}`);
};
