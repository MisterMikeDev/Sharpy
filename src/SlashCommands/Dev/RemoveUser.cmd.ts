import { CacheType, CommandInteraction } from "discord.js";
import { Sharpy } from "../../Client";
import { Db } from "../../Helpers/Db/Blacklist";
import { Emojis } from "../../Data/Emojis";

export const RemoveUserBlacklistCommand = async ({
    Sharpy,
    interaction,
    userId
}: {
    Sharpy: Sharpy;
    interaction: CommandInteraction<CacheType>;
    userId: string;
}) => {
    const user = await Db.GetUserById(Sharpy, userId);

    if (!user)
        return await interaction.followUp({
            content: `${Emojis.Util.No} | El usuario con la ID: ${userId} no está en la lista negra.`
        });

    try {
        await Db.RemoveUserBlacklist(Sharpy, userId);

        await interaction.followUp({
            content: `${Emojis.Util.Yes} | El usuario con la ID: ${userId} ha sido removido de la lista negra.`
        });
    } catch (error) {
        console.error(error);
        await interaction.followUp({
            content: `${Emojis.Util.No} | Ha ocurrido un error al remover el usuario de la lista negra.`
        });
    }
};
