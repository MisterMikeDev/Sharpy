import { EmbedBuilder } from "discord.js";
import { Sharpy } from "../../../Client";
import { PartersInfo } from "../../../Data/Data";

export const PartnerEmbed = async ({ Sharpy }: { Sharpy: Sharpy }) => {
    const { color, emojiNumbers, info, prefix, title, description, line } = PartersInfo;

    function TransformStringNumbersToEmojis(string: string): string {
        return string.replace(/\$\d\$/g, (match) => {
            const key = match;
            return emojiNumbers[key] || match;
        });
    }

    const listData = info
        .map(
            (i, index) =>
                `> ## $${index + 1}$ ${i.title}\n${i.data
                    .map((d) => `${prefix}${d}`)
                    .join("\n")}\n`
        )
        .join("\n");

    const fixedRules = TransformStringNumbersToEmojis(listData);

    const embedDescription = `# ${title}\n\n${description}\n${line}\n\n${fixedRules}`;

    const embed = new EmbedBuilder()
        .setColor(color)
        .setDescription(embedDescription)
        .setFooter({
            text: "Echoes of Talent | Sharpy",
            iconURL: Sharpy.user!.displayAvatarURL()
        });

    return { embed };
};
