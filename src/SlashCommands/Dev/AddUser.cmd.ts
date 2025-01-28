import { CacheType, CommandInteraction } from "discord.js";
import { Sharpy } from "../../Client";
import { Db } from "../../Helpers/Db/Blacklist";
import { Emojis } from "../../Data/Emojis";

export const AddUserBlacklistCommand = async ({
    Sharpy,
    interaction,
    userId,
    reason
}: {
    Sharpy: Sharpy;
    interaction: CommandInteraction<CacheType>;
    userId: string;
    reason?: string;
}) => {
    const user = await Db.GetUserById(Sharpy, userId);

    if (user)
        return await interaction.followUp({
            content: `${Emojis.Util.No} | El usuario con la ID: ${userId} ya está en la lista negra.`
        });

    try {
        await Db.AddUserBlacklist(Sharpy, userId, reason);

        await interaction.followUp({
            content: `${Emojis.Util.Yes} | El usuario con la ID: ${userId} ha sido añadido a la lista negra.`
        });
    } catch (error) {
        console.error(error);
        await interaction.followUp({
            content: `${Emojis.Util.No} | Ha ocurrido un error al añadir el usuario a la lista negra.`
        });
    }
};
