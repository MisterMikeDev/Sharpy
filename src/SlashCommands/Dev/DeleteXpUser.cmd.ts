import { CacheType, CommandInteraction } from "discord.js";
import { Sharpy } from "../../Client";
import { Db } from "../../Helpers/Db/LevelSystem";
import { Emojis } from "../../Data/Emojis";

export const DeleteXpUserCommand = async ({
    Sharpy,
    interaction,
    userId
}: {
    Sharpy: Sharpy;
    interaction: CommandInteraction<CacheType>;
    userId: string;
}) => {
    await Db.RemoveUser(Sharpy, userId);

    await interaction.reply({
        content: `${Emojis.Util.Yes} | Se ha eliminado al usuario ${userId} de la base de datos.`,
        ephemeral: true
    });
};
