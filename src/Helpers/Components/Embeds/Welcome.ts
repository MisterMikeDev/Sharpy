import { EmbedBuilder, User } from "discord.js";
import { WelcomeInfo } from "../../../Data/Data";

export const WelcomeEmbed = (user: User) => {
    const description = `# ${WelcomeInfo.title}\n${WelcomeInfo.description}\n\n${WelcomeInfo.info.i
        .map((i) => `${WelcomeInfo.info.prefix} ${i}`)
        .join("\n\n")}\n${WelcomeInfo.footer}`;

    const embed = new EmbedBuilder()
        .setDescription(description)
        .setThumbnail(user.displayAvatarURL())
        .setColor(WelcomeInfo.color)
        .setImage(WelcomeInfo.image)
        .setFooter({
            text: "Bienvendio a Echoes of Talent",
            iconURL: WelcomeInfo.thumbnail
        })
        .setTimestamp();

    return embed;
};
