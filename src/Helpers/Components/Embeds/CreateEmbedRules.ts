import { EmbedBuilder } from "discord.js";
import { Sharpy } from "../../../Client";
import { Rules } from "../../../Data/Data";

export const CreateEmbedRules = ({ Sharpy }: { Sharpy: Sharpy }) => {
    const { title, rules, footer, color, image, emojiNumbers } = Rules;

    function TransformStringNumbersToEmojis(string: string): string {
        return string.replace(/\$\d\$/g, (match) => {
            const key = match;
            return emojiNumbers[key] || match;
        });
    }

    const listRules = rules
        .map(({ title, prefix, rules }) => {
            const fixedRules = rules
                .map((rule, i) => `> $${i + 1}$ ${rule}`)
                .join("\n\n");

            return `### ${prefix} ${title}\n\n${fixedRules}`;
        })
        .join("\n\n");

    const fixedRules = TransformStringNumbersToEmojis(listRules);

    const description = `# ${title}\n\n${fixedRules}\n\n${footer}`;

    const embed = new EmbedBuilder()
        .setDescription(description)
        .setColor(color)
        .setImage(image)
        .setFooter({
            text: "Reglas de Echoes of Talent",
            iconURL: Sharpy.user!.displayAvatarURL()
        });

    return { embed };
};
