import { EmbedBuilder } from "discord.js";
import { Emojis } from "../../../Data/Emojis";
import { Sharpy } from "../../../Client";
import { StaffTeamSuffixes } from "../../../Data/Data";

export function StaffTeamEmbed(Sharpy: Sharpy, teamName: string, teamIds: string[]) {
    const list = GenerateTeamList(teamIds);

    return new EmbedBuilder()
        .setTitle(`Equipo de ${teamName}`)
        .setDescription(list)
        .setColor("#550000")
        .setFooter({
            text: `Echoes Of Talent | ${Sharpy.user!.username}`,
            iconURL: Sharpy.user!.displayAvatarURL()
        })
        .setTimestamp();
}

function GenerateTeamList(teamIds: string[]): string {
    if (teamIds.length === 0) {
        return "No hay miembros en este equipo";
    }

    return teamIds
        .map((memberId) => {
            const suffix = StaffTeamSuffixes[memberId] ?? "";
            return `${Emojis.Echo.PurpleArrow} <@${memberId}>${suffix}`;
        })
        .join("\n");
}
