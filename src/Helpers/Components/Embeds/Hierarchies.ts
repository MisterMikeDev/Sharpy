import { EmbedBuilder } from "discord.js";
import { Sharpy } from "../../../Client";
import { Hierarchies } from "../../../Data/Data";

export const HierarchiesEmbed = ({ Sharpy }: { Sharpy: Sharpy }) => {
    const color = Hierarchies.color;

    const description = `# ${Hierarchies.title}\n${Hierarchies.description}\n\n${Hierarchies.roles
        .map(
            (hierarchy) =>
                `> ## ${hierarchy.title}\n${hierarchy.description}${
                    hierarchy.note ? `\n\n${Hierarchies.prefix}*${hierarchy.note}*` : ""
                }`
        )
        .join("\n\n")}`;

    const embed = new EmbedBuilder()
        .setColor(color)
        .setDescription(description)
        .setImage(Hierarchies.image)
        .setFooter({
            text: "Echoes of Talent | Jerarquías",
            iconURL: Sharpy.user!.displayAvatarURL()
        });

    return {
        embed
    };
};
