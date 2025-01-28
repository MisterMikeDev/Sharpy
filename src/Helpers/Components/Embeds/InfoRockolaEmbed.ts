import { EmbedBuilder } from "discord.js";
import { Sharpy } from "../../../Client";
import { InfoRockola } from "../../../Data/Data";

export const InfoRockolaEmbed = ({ Sharpy }: { Sharpy: Sharpy }) => {
    const { title, description, prefix, list, color, note } = InfoRockola;
    const des = `# ${title}\n${description}\n\n${list
        .map((item) => {
            return `**> ### ${prefix} ${item.title}**\n${item.commands.map((command) => `${item.prefix}${command}`).join("\n")}`;
        })
        .join("\n\n")}\n\n*${note}*`;

    const embed = new EmbedBuilder()
        .setDescription(des)
        .setImage(
            "https://cdn.discordapp.com/attachments/1178199527212199978/1333203553484804206/Reglas_Staff_700_x_500_px_4.png?ex=67980a10&is=6796b890&hm=684223f55567fe91edc6786fbce88436a62e51c373a527504cda940037ad875c&"
        )
        .setColor(color)
        .setFooter({
            text: "Echoes of Talent | Info Rockola",
            iconURL: Sharpy.user!.displayAvatarURL()
        });

    return { embed };
};
