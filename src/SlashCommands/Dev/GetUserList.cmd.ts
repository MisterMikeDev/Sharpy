import { CacheType, CommandInteraction } from "discord.js";
import { Sharpy } from "../../Client";
import { Db } from "../../Helpers/Db/Blacklist";
import { Emojis } from "../../Data/Emojis";

export const GetUserListBlacklistCommand = async ({
    Sharpy,
    interaction
}: {
    Sharpy: Sharpy;
    interaction: CommandInteraction<CacheType>;
}) => {
    const blacklistedUsers = await Db.GetAllBlacklistedUser(Sharpy);

    if (!blacklistedUsers.length)
        return await interaction.followUp({
            content: `${Emojis.Util.No} | No hay usuarios en la lista negra.`
        });

    const users = blacklistedUsers.map((user) => {
        return `ID: ${user.userId} | Razón: \`${user.reason}\``;
    });

    await interaction.followUp({
        content: `${Emojis.Util.Yes} | Lista de usuarios en la lista negra:\n\n${users.join("\n")}`
    });
};
