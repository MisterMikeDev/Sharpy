import { EmbedBuilder } from "discord.js";
import { Sharpy } from "../../../Client";
import { StaffEventRules } from "../../../Data/Data";

export const StaffEventRulesEmbed = ({ Sharpy }: { Sharpy: Sharpy }) => {
    const { title, emojiNumbers, color, rules } = StaffEventRules;

    function TransformStringNumbersToEmojis(string: string): string {
        return string.replace(/\$\d\$/g, (match) => {
            const key = match;
            return emojiNumbers[key] || match;
        });
    }

    const listRules = rules
        .map((rule, index) => `> ## $${index + 1}$ ${rule.title}\n${rule.description}`)
        .join("\n\n");

    const des = `# ${title}\n\n${TransformStringNumbersToEmojis(listRules)}`;

    const embed = new EmbedBuilder().setColor(color).setDescription(des).setFooter({
        text: "Echoes of Talent | Reglas de Eventos para el Staff",
        iconURL: Sharpy.user!.displayAvatarURL()
    });

    return {
        embed
    };
};
