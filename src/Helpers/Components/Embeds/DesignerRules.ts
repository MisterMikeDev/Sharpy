import { EmbedBuilder } from "discord.js";
import { Sharpy } from "../../../Client";
import { DesignerRules } from "../../../Data/Data";

export const DesignerRulesEmbed = ({ Sharpy }: { Sharpy: Sharpy }) => {
    const { title, description, emojiNumbers, color, rules } = DesignerRules;

    function TransformStringNumbersToEmojis(string: string): string {
        return string.replace(/\$\d\$/g, (match) => {
            const key = match;
            return emojiNumbers[key] || match;
        });
    }

    const listRules = rules
        .map((rule, index) => `> ## $${index + 1}$ ${rule.title}\n${rule.description}`)
        .join("\n\n");

    const des = `# ${title}\n${description}\n\n${TransformStringNumbersToEmojis(listRules)}`;

    const embed = new EmbedBuilder().setColor(color).setDescription(des).setFooter({
        text: "Echoes of Talent | Reglas de Diseñadores",
        iconURL: Sharpy.user!.displayAvatarURL()
    });

    return {
        embed
    };
};
