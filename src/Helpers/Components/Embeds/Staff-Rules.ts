import { EmbedBuilder } from "discord.js";
import { Sharpy } from "../../../Client";
import { StaffRules } from "../../../Data/Data";

export const EmbedStaffRules = (Sharpy: Sharpy) => {
    const description = `# ${StaffRules.title}\n${StaffRules.description}\n\n${StaffRules.rules
        .map(
            (ruleSet) =>
                `> ${ruleSet.title}\n${ruleSet.rules
                    .map((rule) => `${ruleSet.prefix} ${rule}`)
                    .join("\n\n")}`
        )
        .join("\n\n")}\n\n${StaffRules.footer}`;

    const StaffRuless = new EmbedBuilder()
        .setImage(StaffRules.image)
        .setColor(StaffRules.color)
        .setDescription(description)
        .setFooter({
            iconURL: Sharpy.user!.displayAvatarURL(),
            text: `Echoes of Talent | ${Sharpy.user!.username}`
        });

    return StaffRuless;
};
