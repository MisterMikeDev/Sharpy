import { EmbedBuilder } from "discord.js";
import { Sharpy } from "../../../Client";
import { ManualJuradoInfo } from "../../../Data/Data";

export const ManualEmbed = ({ Sharpy }: { Sharpy: Sharpy }) => {
    const { title, description, list, note, points, prefix, color, footer } =
        ManualJuradoInfo;
    const des = `# ${title}\n\n${description}\n\n${list.map((l) => `${prefix}${l}`).join("\n")}\n\n${note}\n\n${points.title}\n\n${points.list.map((l) => `${points.prefix}${l}`).join("\n")}\n\n${footer}`;

    const embed = new EmbedBuilder().setDescription(des).setColor(color).setFooter({
        text: "Echoes Of Talent | Manual de Jurado",
        iconURL: Sharpy.user!.displayAvatarURL()
    });

    return { embed };
};
