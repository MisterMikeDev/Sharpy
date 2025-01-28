import { EmbedBuilder } from "discord.js";
import { Sharpy } from "../../../Client";
import { StaffInfoRules } from "../../../Data/Data";

export const InfoStaffRulesEmbed = ({ Sharpy }: { Sharpy: Sharpy }) => {
    const { title, description, color, section } = StaffInfoRules;

    const descriptionText = `# ${title}\n${description}\n\n> ## ${section.warns.title}\n${section.warns.fields
        .map((field) => `- ${section.warns.prefix}${field}`)
        .join(
            "\n"
        )}\n\n${section.warns.note}\n\n> ## ${section.instaban.title}\n${section.instaban.fields
        .map((field) => `- ${section.instaban.prefix}${field}`)
        .join("\n")}`;

    const embed = new EmbedBuilder()
        .setDescription(descriptionText)
        .setColor(color)
        .setFooter({
            iconURL: Sharpy.user!.displayAvatarURL(),
            text: "Echoes of Talent | Info Staff"
        });

    return { embed };
};
