import { EmbedBuilder } from "discord.js";
import { Sharpy } from "../../../Client";
import { InfoBooster } from "../../../Data/Data";

export const EmbedInfoBoosters = (Sharpy: Sharpy) => {
    const description = `# ${InfoBooster.title}\n\n${InfoBooster.description}\n${InfoBooster.info
        .map(
            (i) =>
                `## **${i.title}**\n${i.benefits.map((b) => `> ${i.prefix} ${b}`).join("\n")}`
        )
        .join("\n\n")}`;

    const InfoBoosters = new EmbedBuilder()
        .setImage(InfoBooster.image)
        .setColor(InfoBooster.color)
        .setDescription(description)
        .setFooter({
            iconURL: Sharpy.user!.displayAvatarURL(),
            text: `Echoes of Talent | ${Sharpy.user!.username}`
        });

    return InfoBoosters;
};
