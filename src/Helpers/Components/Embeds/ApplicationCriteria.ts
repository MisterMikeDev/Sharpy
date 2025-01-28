import { EmbedBuilder } from "discord.js";
import { Sharpy } from "../../../Client";
import { ApplicationCriteriaInfo } from "../../../Data/Data";

export const ApplicationCriteriaEmbed = ({ Sharpy }: { Sharpy: Sharpy }) => {
    const color = ApplicationCriteriaInfo.color;
    const description = `# ${ApplicationCriteriaInfo.title}\n${ApplicationCriteriaInfo.description}\n\n${ApplicationCriteriaInfo.sections
        .map(
            (section) =>
                `> ## **${section.title}**\n${section.list
                    .map((l) => `${section.prefix} ${l}`)
                    .join("\n")}`
        )
        .join("\n\n")}`;

    const embed = new EmbedBuilder()
        .setColor(color)
        .setDescription(description)
        .setImage(ApplicationCriteriaInfo.image)
        .setFooter({
            text: "Echoes of Talent | Criterios de Postulación",
            iconURL: Sharpy.user!.displayAvatarURL()
        });

    return { embed };
};
