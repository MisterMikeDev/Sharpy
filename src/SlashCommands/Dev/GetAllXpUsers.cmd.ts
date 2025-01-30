import { CacheType, CommandInteraction } from "discord.js";
import { Sharpy } from "../../Client";
import { Db } from "../../Helpers/Db/LevelSystem";
import { Emojis } from "../../Data/Emojis";

export const GetAllXpUsersCommand = async ({
    Sharpy,
    interaction
}: {
    Sharpy: Sharpy;
    interaction: CommandInteraction<CacheType>;
}) => {
    const Users = await Db.GetAllUsers(Sharpy);

    const UsersList = Users.slice(0, 50).map((user) => {
        return `- <@${user.userId}> - Nivel: ${user.textLevel} - XP: ${user.textXp}`;
    });

    await interaction.followUp({
        content: `${Emojis.Util.Yes} | Usuarios con XP:\n${UsersList.join("\n")}`,
        ephemeral: true
    });
};
