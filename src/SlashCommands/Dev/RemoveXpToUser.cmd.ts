import { CacheType, CommandInteraction } from "discord.js";
import { Sharpy } from "../../Client";
import { Db } from "../../Helpers/Db/LevelSystem";
import { Emojis } from "../../Data/Emojis";

export const RemoveXpToUserCommand = async ({
    Sharpy,
    interaction,
    userId,
    xp
}: {
    Sharpy: Sharpy;
    interaction: CommandInteraction<CacheType>;
    userId: string;
    xp: number;
}) => {
    const user = await Db.GetUserByUserId(Sharpy, userId);

    if (!user)
        return await interaction.followUp({
            content: `${Emojis.Util.No} | El usuario con la ID: ${userId} no existe en la base de datos.`
        });

    try {
        await Db.RemoveXpToUser(Sharpy, userId, xp);

        await interaction.followUp({
            content: `${Emojis.Util.Yes} | Se han eliminado ${xp} puntos de experiencia al usuario con la ID: ${userId}.`
        });
    } catch (error) {
        console.error(error);
        await interaction.followUp({
            content: `${Emojis.Util.No} | Ha ocurrido un error al eliminar los puntos de experiencia al usuario.`
        });
    }
};
