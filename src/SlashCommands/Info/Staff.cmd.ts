import { CommandInteraction, CacheType } from "discord.js";
import { Sharpy } from "../../Client";
import { EchoesTeam } from "../../Data/Data";
import { StaffCategory } from "../../Interfaces";
import { FixedName, StaffTeamEmbed } from "../../Helpers";
import { Config } from "../../Data/Config";

export const StaffCommand = async ({
    Sharpy,
    interaction,
    category
}: {
    Sharpy: Sharpy;
    interaction: CommandInteraction<CacheType>;
    category?: StaffCategory;
}) => {
    let categoryName: string;
    let teamIds: string[];
    if (category) {
        categoryName = FixedName(category);
        teamIds = EchoesTeam[category];
    } else {
        const StaffRoleId = Config.DiscordBot.EchosOfTalent.roles.Staff;
        const members = await Sharpy.guilds
            .resolve(Config.DiscordBot.EchosOfTalent.id)!
            .members.fetch();

        categoryName = "Staff";
        teamIds = members
            .filter((member) => member.roles.cache.has(StaffRoleId))
            .filter((member) => !member.user.bot)
            .sort((a, b) => a.user.username.localeCompare(b.user.username))
            .map((member) => member.id);
    }

    const embed = StaffTeamEmbed(Sharpy, categoryName, teamIds);

    await interaction.followUp({
        content: `Este es el equipo de ${categoryName}`,
        embeds: [embed]
    });
};
